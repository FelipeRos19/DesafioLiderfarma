import { render, screen } from "@testing-library/react"
import ReportHeader from "../ReportHeader"

describe("ReportHeader — exibe snapshotId e data do snapshot", () => {

    it("exibe o snapshotId corretamente", () => {
        render(
            <ReportHeader
                execID="exec-2026-03-12-07"
                execDate="2026-03-12T03:35:10-03:00"
            />
        )

        expect(screen.getByText(/exec-2026-03-12-07/i)).toBeInTheDocument()
    })

    it("exibe a data do snapshot corretamente", () => {
        render(
            <ReportHeader
                execID="exec-2026-03-12-07"
                execDate="2026-03-12T03:35:10-03:00"
            />
        )

        expect(screen.getByText(/2026-03-12T03:35:10/i)).toBeInTheDocument()
    })

})