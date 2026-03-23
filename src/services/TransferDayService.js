import { generateFixtures } from "../mocks/futureTransfers.fixtures"

const dataset = generateFixtures(150)

const STORAGE_KEY = "transferDay:edits"

const wildcardToRegex = (pattern) => {
    const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&")
    const regexStr = escaped.split("%").join(".*")
    return new RegExp(regexStr, "i")
}

const applyFilters = (data, filters = {}) => {
    const { descricao = "", loja_origem = "", loja_destino = "", problema_alvo: problemaAlvo = ""} = filters

    if (!Array.isArray(data)) return []

    return data.filter((row) => {
        const matchDescricao = descricao
            ? wildcardToRegex(descricao).test(row.descricao)
            : true

        const matchOrigem = loja_origem
            ? row.loja_origem.toLowerCase().startsWith(loja_origem.toLowerCase())
            : true

        const matchDestino = loja_destino
            ? row.loja_destino.toLowerCase().startsWith(loja_destino.toLowerCase())
            : true

        const matchProblema = problemaAlvo
            ? row.problema_alvo === problemaAlvo
            : true

        return matchDescricao && matchOrigem && matchDestino && matchProblema
    })
}

const generateSnapshotId = () => {
    const date = new Date().toISOString().slice(0, 10)
    const random = Math.floor(Math.random() * 100).toString().padStart(2, "0")
    return `exec-${date}-${random}`
}

const SNAPSHOT_ID = generateSnapshotId()
const SNAPSHOT_CREATED_AT = new Date().toISOString()

const loadEdits = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : {}
    } catch {
        return {}
    }
}

const saveEdit = (produto_id, changes) => {
    try {
        const edits = loadEdits()
        edits[produto_id] = { ...edits[produto_id], ...changes }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(edits))
    } catch {
        console.error("Erro ao salvar edição no localStorage")
    }
}

const applyEdits = (data) => {
    try {
        const edits = loadEdits()
        if (!Array.isArray(data)) return []
        return data.map((row) =>
            edits[row.produto_id] ? { ...row, ...edits[row.produto_id] } : row
        )
    } catch {
        return data ?? []
    }
}

export const transferDayService = {
    getList({ page = 1, items_per_page = 12, filters = {} }) {
        const withEdits = applyEdits(dataset)
        const filtered = applyFilters(withEdits, filters)

        const totalItems = filtered.length
        const totalPages = Math.max(1, Math.ceil(totalItems / items_per_page))
        const safePage = Math.min(page, totalPages)

        const start = (safePage - 1) * items_per_page
        const pagedData = filtered.slice(start, start + items_per_page)

        return {
            snapshotId: "exec-2026-03-12-07",
            snapshotCreatedAt: "2026-03-12T03:35:10-03:00",
            pagedData,
            totalItems,
            totalPages,
        }
    },

    saveStatus(produto_id, status) {
        saveEdit(produto_id, { status })
    },

    saveQuantity(produto_id, quantidade) {
        saveEdit(produto_id, { quantidade })
    },

    clearEdits() {
        localStorage.removeItem(STORAGE_KEY)
    },
}