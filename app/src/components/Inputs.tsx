export function Inputs() {
    return (
        <>
            <section className="box-content">
                <article className="avatar-section">
                    <img src="/assets/avatar.png" alt="Avatar" className="avatar" />
                    <p>RecrutadoraIA</p>
                    <span className="response-IA"></span>
                    <span className="response-text"></span>
                </article>
                <aside>
                    <input
                        type="text"
                        className="field-message"
                        placeholder="Digite (iniciar) para iniciarmos a entrevista"
                    />
                    <button className="button-gerateText">
                        Enviar
                    </button>
                </aside>
            </section>
        </>
    )
}