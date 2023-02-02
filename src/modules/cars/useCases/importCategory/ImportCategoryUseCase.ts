import { parse as csvParse } from 'csv-parse'
import fs from 'fs'

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []

      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile
        .on('data', async (line) => {
          const [name, description] = line
          categories.push({
            name,
            description,
          })
        })
        .on('end', () => {
          resolve(categories)
        })
        .on('error', (error) => {
          reject(error)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async (category) => {
      const { name } = category

      const categoryAlreadyExists = this.categoriesRepository.findByName(name)

      if (categoryAlreadyExists) {
        throw new Error('Category already exists!')
      }
      this.categoriesRepository.create(category)
    })
  }
}
