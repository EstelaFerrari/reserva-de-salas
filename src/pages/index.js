import Cabecalho from "@/components/Cabeçalho";
import Cadastro from "@/components/Cadastro";
import Rodape from "@/components/Rodape";
import Tabela from "@/components/Tabela";
import styles from "@/styles/Home.module.css"

export default function Home() {
  return (
    <>
      <div className={styles.pagina}>
        <Cabecalho />
        <div className={styles.corpo}>
          <Tabela />
          <Cadastro/>
        </div>
        <Rodape />
      </div>
    </>
  )
}