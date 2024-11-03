import { SendMessage } from "../services/ResquestServer"

export function Inputs() {
    return (
        <>
            <section className="box-content">
                <article className="avatar-section">
                    <img src="/assets/avatar.png" alt="Avatar" className="avatar" />
                    <p>RecrutadoraIA</p>
                    <SendMessage />
                </article>
                <aside>
                </aside>
            </section>
        </>
    )
}