const produtos = [
    { produto_id: "78901", descricao: "DIPIRONA 500MG" },
    { produto_id: "78902", descricao: "ACETILCISTEINA 20MG/ML FRAMBOESA 120ML" },
    { produto_id: "78903", descricao: "PARACETAMOL 750MG" },
    { produto_id: "78904", descricao: "AMOXICILINA 500MG" },
    { produto_id: "78905", descricao: "IBUPROFENO 600MG" },
    { produto_id: "78906", descricao: "OMEPRAZOL 20MG" },
    { produto_id: "78907", descricao: "LOSARTANA 50MG" },
    { produto_id: "78908", descricao: "METFORMINA 850MG" },
    { produto_id: "78909", descricao: "ATENOLOL 25MG" },
    { produto_id: "78910", descricao: "SIMVASTATINA 20MG" },
    { produto_id: "78911", descricao: "AZITROMICINA 500MG" },
    { produto_id: "78912", descricao: "DEXAMETASONA 4MG" },
    { produto_id: "78913", descricao: "RANITIDINA 150MG" },
    { produto_id: "78914", descricao: "CAPTOPRIL 25MG" },
    { produto_id: "78915", descricao: "FLUCONAZOL 150MG" },
]

const lojas = [
    "101", "102", "103", "104", "105",
    "201", "202", "203", "204", "205", "206",
]

const problemasAlvo = ["RUPTURA", "SEM_GIRO", "EXCESSO", "DESBALANCEADO"]

const motivosExclusao = [
    "Bloqueado pela regra X",
    "Bloqueado pelo usuário",
    "Produto em falta no destino",
    "Estoque insuficiente",
    "Transferência não autorizada",
    "",
]

const statuses = ["PERMITIDO", "NAO_PERMITIDO"]

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

const generateItem = (id) => {
    const produto = pick(produtos)
    const lojaOrigem = pick(lojas)
    let lojaDestino
    do {
        lojaDestino = pick(lojas)
    } while (lojaDestino === lojaOrigem)

    return {
        id,
        produto_id: produto.produto_id,
        descricao: produto.descricao,
        loja_origem: lojaOrigem,
        loja_destino: lojaDestino,
        quantidade: Math.floor(Math.random() * 50),
        status: pick(statuses),
        problema_alvo: pick(problemasAlvo),
        motivo_exclusao: pick(motivosExclusao),
    }
}

export const generateFixtures = (totalItems = 101) =>
    Array.from({ length: totalItems }, (_, i) => generateItem(i + 1))