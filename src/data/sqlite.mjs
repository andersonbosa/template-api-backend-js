import sqlite3 from 'sqlite3'
import { v4 as uuidv4 } from 'uuid'

// Cria uma instância do banco de dados SQLite em memória
const db = new sqlite3.Database(':memory:')

// Inicializa a tabela 'items' se ela não existir
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS items (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT
        )
    `)
})

/**
 * Repositório para operações CRUD usando SQLite.
 */
export const sqliteRepository = {
    /**
     * Busca todos os itens da tabela.
     * @returns {Promise<Array>} Lista de todos os itens.
     */
    getAllItems() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM items', [], (err, rows) => {
                if (err) return reject(err) // Erro ao buscar itens
                resolve(rows)
            })
        })
    },

    /**
     * Busca um item pelo seu ID.
     * @param {string} id - O ID do item.
     * @returns {Promise<Object|null>} O item encontrado ou null.
     */
    getItemById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err) // Erro ao buscar item
                resolve(row)
            })
        })
    },

    /**
     * Cria um novo item na tabela.
     * @param {Object} param0 - Objeto contendo name e description.
     * @param {string} param0.name - Nome do item (obrigatório).
     * @param {string} [param0.description] - Descrição do item (opcional).
     * @returns {Promise<Object>} O item criado.
     */
    createItem({ name, description }) {
        return new Promise((resolve, reject) => {
            const id = uuidv4() // Gera um UUID para o novo item
            db.run(
                'INSERT INTO items (id, name, description) VALUES (?, ?, ?)',
                [id, name, description || null],
                function (err) {
                    if (err) return reject(err) // Erro ao inserir item
                    resolve({ id, name, description })
                }
            )
        })
    },

    /**
     * Atualiza um item existente pelo ID.
     * @param {string} id - O ID do item a ser atualizado.
     * @param {Object} param1 - Objeto contendo name e description.
     * @param {string} param1.name - Novo nome do item.
     * @param {string} [param1.description] - Nova descrição do item.
     * @returns {Promise<Object|null>} O item atualizado ou null se não encontrado.
     */
    updateItem(id, { name, description }) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE items SET name = ?, description = ? WHERE id = ?',
                [name, description || null, id],
                function (err) {
                    if (err) return reject(err) // Erro ao atualizar item
                    if (this.changes === 0) return resolve(null) // Nenhum item atualizado
                    resolve({ id, name, description })
                }
            )
        })
    },

    /**
     * Deleta um item pelo ID.
     * @param {string} id - O ID do item a ser deletado.
     * @returns {Promise<boolean>} True se o item foi deletado, false caso contrário.
     */
    deleteItem(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
                if (err) return reject(err) // Erro ao deletar item
                resolve(this.changes > 0) // Retorna true se algum item foi deletado
            })
        })
    },
} 