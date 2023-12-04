import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
export default function Label() {

    const [reserva, setReserva] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/reservas')
            .then(resultado => setReserva(resultado.data))
    }, [])

    function formatarData(data) {
        if (typeof data === 'string') {
            const [ano, mes, dia] = data.split('-');
            return `${ano}`;
        } else {
            return data;
        }

    }

    return (
        <>
            <div>
                <div className={styles.corpo}>
                    <table className={styles.tabela}>
                        <thead className={styles.titulos_tabela}>
                            <tr>
                                <th>Descrição</th>
                                <th>Solicitante</th>
                                <th>Sala</th>
                                <th>Início</th>
                                <th>Fim</th>
                            </tr>
                        </thead>
                        <tbody className={styles.linhas_tabela}>
                            {reserva?.map(a => (
                                <tr key={a.id} onClick={() => console.log(a)}>
                                    <td>{a.descricao}</td>
                                    <td>{a.solicitante}</td>
                                    <td>{a.sala}</td>
                                    <td>{formatarData(a.dataInicial)}</td>
                                    <td>{formatarData(a.dataFinal)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    )
}