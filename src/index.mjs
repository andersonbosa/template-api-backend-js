import express from 'express'
import dotenv from 'dotenv'
import { memoryRepository } from './data/memory.mjs'
import { sqliteRepository } from './data/sqlite.mjs'
import morgan from 'morgan'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware para analisar corpos JSON
app.use(express.json())
app.use(morgan('combined'))


// Seleciona o repositório com base na variável de ambiente
const dbType = process.env.DB_TYPE || 'memory'
const db = dbType === 'sqlite' ? sqliteRepository : memoryRepository

// Rota raiz
app.get('/', (req, res) => {
    res.json({ message: 'Bem-vindo à API de exemplo com CRUD!' })
})

// CREATE: Adiciona um novo item
app.post('/api/items', async (req, res) => {
    const { name, description } = req.body
    if (!name) {
        return res.status(400).json({ error: 'Nome é obrigatório' })
    }
    try {
        const newItem = await db.createItem({ name, description })
        res.status(201).json(newItem)
    } catch (err) {
        res.status(500).json({ error: 'Erro no banco de dados' })
    }
})

// READ: Obtém todos os itens
app.get('/api/items', async (req, res) => {
    try {
        const items = await db.getAllItems()
        res.json(items)
    } catch (err) {
        res.status(500).json({ error: 'Erro no banco de dados' })
    }
})

// READ: Obtém um único item pelo id
app.get('/api/items/:id', async (req, res) => {
    const { id } = req.params
    try {
        const item = await db.getItemById(id)
        if (!item) {
            return res.status(404).json({ error: 'Item não encontrado' })
        }
        res.json(item)
    } catch (err) {
        res.status(500).json({ error: 'Erro no banco de dados' })
    }
})

// UPDATE: Atualiza um item pelo id
app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params
    const { name, description } = req.body
    if (!name) {
        return res.status(400).json({ error: 'Nome é obrigatório' })
    }
    try {
        const updatedItem = await db.updateItem(id, { name, description })
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item não encontrado' })
        }
        res.json(updatedItem)
    } catch (err) {
        res.status(500).json({ error: 'Erro no banco de dados' })
    }
})

// DELETE: Deleta um item pelo id
app.delete('/api/items/:id', async (req, res) => {
    const { id } = req.params
    try {
        const success = await db.deleteItem(id)
        if (!success) {
            return res.status(404).json({ error: 'Item não encontrado' })
        }
        res.json({ message: 'Item deletado' })
    } catch (err) {
        res.status(500).json({ error: 'Erro no banco de dados' })
    }
})

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(`Using ${dbType} database`)
})

