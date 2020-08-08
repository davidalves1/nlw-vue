<template>
  <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              v-model="name"
            />
            <Input
              name="avatar"
              label="Avatar"
              v-model="avatar"
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              v-model="whatsapp"
            />
            <Textarea
              name="bio"
              label="Biografia"
              v-model="bio"
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              v-model="subject"
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'História', label: 'História' },
                { value: 'Português', label: 'Português' },
                { value: 'Inglês', label: 'Inglês' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Física', label: 'Física' },
                { value: 'Química', label: 'Química' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Filosofia', label: 'Filosofia' },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              v-model="cost"
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  v-model="scheduleItem"week_day}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'week_day', e.target.value)
                  }
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  v-model="scheduleItem"from}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'from', e.target.value)
                  }
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  v-model="scheduleItem"to}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'to', e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
</template>

<script>
export default {
  name: 'TeacherForm',
};
</script>

<style scoped>
  #page-teacher-form {
  width: 100vw;
  height: 100vh;
}

#page-teacher-form .page-header .header-content {
  margin-bottom: 6.4rem;
}

#page-teacher-form main {
  background: var(--color-box-base);
  width: 100%;
  max-width: 74rem;
  border-radius: 0.8rem;
  margin: -3.2rem auto 3.2rem auto;
  padding-top: 6.4rem;
  overflow: hidden;
}

#page-teacher-form main fieldset {
  border: 0;
  padding: 0 2.4rem;
}

#page-teacher-form main fieldset + fieldset {
  margin-top: 6.4rem;
}

#page-teacher-form main fieldset legend {
  font: 700 2.4rem Archivo;
  color: var(--color-text-title);
  margin-bottom: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid var(--color-line-in-white);
}

#page-teacher-form main fieldset legend button {
  background: none;
  border: 0;
  color: var(--color-primary);
  font: 700 1.6rem Archivo;
  cursor: pointer;
  transition: color 0.2s;
}

#page-teacher-form main fieldset legend button:hover {
  color: var(--color-primary-dark);
}

#page-teacher-form main fieldset .input-block + .textarea-block,
#page-teacher-form main fieldset .select-block + .input-block {
  margin-top: 2.4rem;
}

#page-teacher-form main label {
  color: var(--color-text-complement);
}

#page-teacher-form main footer {
  padding: 4rem 2.4rem;
  background: var(--color-box-footer);
  border-top: 1px solid var(--color-line-in-white);
  margin-top: 6.4rem;
}

#page-teacher-form main footer p {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: var(--color-text-complement);
}

#page-teacher-form main footer p img {
  margin-right: 2rem;
}

#page-teacher-form main footer button {
  width: 100%;
  height: 5.6rem;
  background: var(--color-secundary);
  color: var(--color-button-text);
  border: 0;
  border-radius: 0.8rem;
  cursor: pointer;
  font: 700 1.6rem Archivo;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;
  margin-top: 3.2rem;
}

#page-teacher-form main footer button:hover {
  background-color: var(--color-secundary-dark);
}

@media (min-width: 700px) {
  #page-teacher-form {
    max-width: 100vw;
  }

  #page-teacher-form .page-header .header-content {
    margin-bottom: 0;
  }

  #page-teacher-form main fieldset {
    padding: 0 6.4rem;
  }

  #page-teacher-form main .schedule-item {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    column-gap: 1.6rem;
  }

  #page-teacher-form main .schedule-item .input-block {
    margin-top: 0 !important;
  }

  #page-teacher-form main footer {
    padding: 4rem 6.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #page-teacher-form main footer p {
    justify-content: space-between;
  }

  #page-teacher-form main footer button {
    width: 20rem;
    margin-top: 0;
  }
}

</style>
