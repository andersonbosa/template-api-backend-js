import { v4 as uuidv4 } from 'uuid'

let items = [
    {
        id: '7824d78c-c38f-4d2b-82e6-53c8a9d2887f',
        name: 'Item 1',
        description: 'Descrição do item 1'
    },
    {
        id: 'de6d4a37-af28-4458-afcd-c65aa148908d',
        name: 'Item 2',
        description: 'Descrição do item 2'
    },
    {
        id: 'b7813714-d651-4dee-880c-a4970d50b27e',
        name: 'Item 3',
        description: 'Descrição do item 3'
    }
]

/**
 * Repositório em memória para operações CRUD de itens.
 */
export const memoryRepository = {
    /**
     * Busca todos os itens.
     * @returns {Promise<Array>} Lista de todos os itens.
     */
    async getAllItems() {
        return items
    },

    /**
     * Busca um item pelo seu ID.
     * @param {string} id - O ID do item.
     * @returns {Promise<Object|null>} O item encontrado ou null se não encontrado.
     */
    async getItemById(id) {
        return items.find((item) => item.id === id)
    },

    /**
     * Cria um novo item.
     * @param {Object} param0 - Objeto contendo name e description.
     * @param {string} param0.name - Nome do item (obrigatório).
     * @param {string} [param0.description] - Descrição do item (opcional).
     * @returns {Promise<Object>} O item criado.
     */
    async createItem({ name, description }) {
        const newItem = { id: uuidv4(), name, description: description || null }
        items.push(newItem)
        return newItem
    },

    /**
     * Atualiza um item existente pelo ID.
     * @param {string} id - O ID do item a ser atualizado.
     * @param {Object} param1 - Objeto contendo name e description.
     * @param {string} param1.name - Novo nome do item.
     * @param {string} [param1.description] - Nova descrição do item.
     * @returns {Promise<Object|null>} O item atualizado ou null se não encontrado.
     */
    async updateItem(id, { name, description }) {
        const itemIndex = items.findIndex((item) => item.id === id)
        if (itemIndex === -1) {
            return null
        }
        const updatedItem = { ...items[itemIndex], name, description: description || null }
        items[itemIndex] = updatedItem
        return updatedItem
    },

    /**
     * Deleta um item pelo ID.
     * @param {string} id - O ID do item a ser deletado.
     * @returns {Promise<boolean>} True se o item foi deletado, false caso contrário.
     */
    async deleteItem(id) {
        const itemIndex = items.findIndex((item) => item.id === id)
        if (itemIndex === -1) {
            return false
        }
        items.splice(itemIndex, 1)
        return true
    },
} 