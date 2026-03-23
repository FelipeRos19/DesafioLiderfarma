// src/services/TransferDayService.test.js
import { transferDayService } from "../TransferDayService"

jest.mock("../../mocks/futureTransfers.fixtures.js", () => ({
    generateFixtures: () => [
        {
            id: 1,
            produto_id: "78902",
            descricao: "ACETILCISTEINA 20MG/ML FRAMBOESA 120ML",
            loja_origem: "101",
            loja_destino: "205",
            quantidade: 5,
            status: "PERMITIDO",
            problema_alvo: "RUPTURA",
            motivo_exclusao: "",
        },
        {
            id: 2,
            produto_id: "78901",
            descricao: "DIPIRONA 500MG",
            loja_origem: "102",
            loja_destino: "201",
            quantidade: 10,
            status: "NAO_PERMITIDO",
            problema_alvo: "EXCESSO",
            motivo_exclusao: "Bloqueado pelo usuário",
        },
        {
            id: 3,
            produto_id: "78903",
            descricao: "PARACETAMOL 750MG",
            loja_origem: "103",
            loja_destino: "202",
            quantidade: 8,
            status: "PERMITIDO",
            problema_alvo: "SEM_GIRO",
            motivo_exclusao: "Produto em falta no destino",
        },
        {
            id: 4,
            produto_id: "78904",
            descricao: "AMOXICILINA 500MG",
            loja_origem: "104",
            loja_destino: "203",
            quantidade: 20,
            status: "NAO_PERMITIDO",
            problema_alvo: "DESBALANCEADO",
            motivo_exclusao: "Estoque insuficiente",
        },
        {
            id: 5,
            produto_id: "78905",
            descricao: "IBUPROFENO 600MG",
            loja_origem: "201",
            loja_destino: "104",
            quantidade: 15,
            status: "PERMITIDO",
            problema_alvo: "RUPTURA",
            motivo_exclusao: "",
        },
    ],
}))

describe("transferDayService — serialização de filtros", () => {
    it("retorna as chaves do contrato esperado", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: {},
        })

        expect(result).toHaveProperty("snapshotId")
        expect(result).toHaveProperty("snapshotCreatedAt")
        expect(result).toHaveProperty("pagedData")
        expect(result).toHaveProperty("totalItems")
        expect(result).toHaveProperty("totalPages")
    })

    it("pagedData é sempre um array", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: {},
        })

        expect(Array.isArray(result.pagedData)).toBe(true)
    })

    it("respeita items_per_page", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 2,
            filters: {},
        })

        expect(result.pagedData.length).toBeLessThanOrEqual(2)
    })

    it("retorna páginas diferentes para pages diferentes", () => {
        const page1 = transferDayService.getList({ page: 1, items_per_page: 2, filters: {} })
        const page2 = transferDayService.getList({ page: 2, items_per_page: 2, filters: {} })

        expect(page1.pagedData[0].id).not.toBe(page2.pagedData[0].id)
    })

    it("safePage não ultrapassa totalPages", () => {
        const result = transferDayService.getList({
            page: 9999,
            items_per_page: 10,
            filters: {},
        })

        expect(result.pagedData.length).toBeGreaterThan(0)
    })

    it("totalPages é consistente com totalItems e items_per_page", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 2,
            filters: {},
        })

        const expectedPages = Math.ceil(result.totalItems / 2)
        expect(result.totalPages).toBe(expectedPages)
    })

    it("filtra descricao com curinga % — encontra ACETILCISTEINA", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: { descricao: "ACET%INA%20%FRAM%120" },
        })

        expect(result.pagedData.length).toBe(1)
        expect(result.pagedData[0].descricao).toBe("ACETILCISTEINA 20MG/ML FRAMBOESA 120ML")
    })

    it("filtra descricao sem curinga", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: { descricao: "DIPIRONA" },
        })

        expect(result.pagedData.length).toBe(1)
        result.pagedData.forEach((row) => {
            expect(row.descricao.toLowerCase()).toContain("dipirona")
        })
    })

    it("filtra descricao com % no início", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: { descricao: "%500MG" },
        })

        expect(result.pagedData.length).toBeGreaterThan(0)
        result.pagedData.forEach((row) => {
            expect(row.descricao).toMatch(/500MG/i)
        })
    })

    it("retorna pagedData vazio quando descricao não bate", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: { descricao: "PRODUTO_INEXISTENTE_XYZ" },
        })

        expect(result.pagedData).toHaveLength(0)
        expect(result.totalItems).toBe(0)
    })

    it("filtra loja_origem com começa com", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: { loja_origem: "10" },
        })

        expect(result.pagedData.length).toBeGreaterThan(0)
        result.pagedData.forEach((row) => {
            expect(row.loja_origem.startsWith("10")).toBe(true)
        })
    })

    it("filtra loja_origem com valor exato", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: { loja_origem: "101" },
        })

        expect(result.pagedData.length).toBe(1)
        expect(result.pagedData[0].loja_origem).toBe("101")
    })

    it("filtra loja_destino com começa com", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: { loja_destino: "20" },
        })

        expect(result.pagedData.length).toBeGreaterThan(0)
        result.pagedData.forEach((row) => {
            expect(row.loja_destino.startsWith("20")).toBe(true)
        })
    })

    it("filtra problema_alvo com match exato", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: { problema_alvo: "RUPTURA" },
        })

        expect(result.pagedData.length).toBe(2)
        result.pagedData.forEach((row) => {
            expect(row.problema_alvo).toBe("RUPTURA")
        })
    })

    it("retorna vazio quando problema_alvo não bate", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: { problema_alvo: "PROBLEMA_INEXISTENTE" },
        })

        expect(result.pagedData).toHaveLength(0)
    })

    // filtros combinados
    it("combina loja_origem e loja_destino", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: { loja_origem: "10", loja_destino: "20" },
        })

        result.pagedData.forEach((row) => {
            expect(row.loja_origem.startsWith("10")).toBe(true)
            expect(row.loja_destino.startsWith("20")).toBe(true)
        })
    })

    it("combina descricao com curinga e problema_alvo", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: { descricao: "DIPIRONA", problema_alvo: "EXCESSO" },
        })

        expect(result.pagedData.length).toBe(1)
        expect(result.pagedData[0].descricao).toBe("DIPIRONA 500MG")
        expect(result.pagedData[0].problema_alvo).toBe("EXCESSO")
    })

    it("combina todos os filtros", () => {
        const result = transferDayService.getList({
            page: 1,
            items_per_page: 10,
            filters: {
                descricao: "DIPIRONA",
                loja_origem: "10",
                loja_destino: "20",
                problema_alvo: "EXCESSO",
            },
        })

        expect(result.pagedData.length).toBe(1)
        expect(result.pagedData[0].produto_id).toBe("78901")
    })

})