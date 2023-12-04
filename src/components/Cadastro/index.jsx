import styles from './styles.module.css';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../Input';

export default function Cadastro() {
  const [reserva, setReserva] = useState({
    descricao: "",
    solicitante: "",
    sala: "",
    inicio: "",
    fim: ""
  })

  const [termo, setTermo] = useState(false)

  const limparReserva = () => {
    setReserva({
      descricao: "",
      solicitante: "",
      sala: "",
      inicio: "",
      fim: ""
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setReserva({
      ...reserva,
      [name]: value
    });
  }

  const handleTermoChange = (e) => {
    setTermo(e.target.checked);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmptyField = Object.values(reserva).some(value => value === "") //isso aq vai verificar se os campos estao vazios

    if (isEmptyField) { //isso aq vai tornar obrigatorio preencher todos os campos
      toast.error('Preencher todos os campos antes de prosseguir é obrigatório.');
      return;
    }

    if (!termo) {
      toast.error('Concorde com os termos antes de reservar uma sala.')
      return;
    }

    try {
      await axios.post('http://localhost:3030/reservas', reserva)
      limparReserva();
      toast.success('Sala reservada com sucesso!')
    } catch (error) {
      console.error(error);
      toast.error('Não foi possivel realizar a reserva, por favor tente novamente!')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.titulo}>
        <h1>Reservar sala</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.subcontainer}>
          <div>
            <label htmlFor='descricao'>Descrição:</label>
            <br />
            <textarea
              name='descricao'
              id='descricao'
              className={styles.textarea}
              value={reserva.descricao}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor='solicitante'>Solicitante:</label>
            <br />
            <Input className={styles.textarea}
              name='solicitante'
              id='solicitante'
              type='text'
              value={reserva.solicitante}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='sala'>Sala:</label>
            <br />
            <Input className={styles.textarea}
              name='sala'
              id='sala'
              type='text'
              value={reserva.sala}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='inicio'>Início:</label>
            <br />
            <Input className={styles.textarea}
              id='inicio'
              type='datetime-local'
              name='inicio'
              value={reserva.inicio}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='fim'>Fim:</label>
            <br />
            <Input className={styles.textarea}
              id='fim'
              type='datetime-local'
              name='fim'
              value={reserva.fim}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="termos"
                id="termos"
                className={styles.checkbox}
                checked={termo}
                onChange={handleTermoChange}
              />
              Concordo com os termos
            </label>
          </div>
          <div className={styles.botaotermos}>
            <button className={styles.botaoreservar} type='submit'>
              Reservar sala</button>
          </div>
        </div>
      </form>
    </div>

  )
}