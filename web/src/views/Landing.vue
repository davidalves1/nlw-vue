<template>
  <div id ="page-landing">
    <div id="page-landing-content" class="container">
      <div class="logo-container">
        <img :src="logoImg" alt="Proffy">
        <h2>Sua plataforma de estudos online</h2>
      </div>

      <img :src="landingImg" alt="" class="hero-image">

      <div class="buttons-container">
        <a href="" class="study">
          <img :src="studyIcon" alt="Estudar">
          Estudar
        </a>

        <a href="" class="give-classes">
          <img :src="giveClassesIcon" alt="Estudar">
          Estudar
        </a>
      </div>

      <span class="total-connections">
        Total de 200 conexões já realizadas <img :src="purpleHeartIcon" alt="Coração">
      </span>

      <app-select
        name="select-cursos"
        label="select-label"
        :options="[{label: 'David', value: 2}]">
      </app-select>
    </div>
  </div>
</template>

<script>
import logoImg from '@/assets/images/logo.svg';
import landingImg from '@/assets/images/landing.svg';
import studyIcon from '@/assets/images/icons/study.svg';
import giveClassesIcon from '@/assets/images/icons/give-classes.svg';
import purpleHeartIcon from '@/assets/images/icons/purple-heart.svg';
import AppSelect from '@/components/AppSelect.vue';

export default {
  name: 'Landing',
  components: {
    AppSelect,
  },
  computed: {
    logoImg() {
      return logoImg;
    },
    landingImg() {
      return landingImg;
    },
    studyIcon() {
      return studyIcon;
    },
    giveClassesIcon() {
      return giveClassesIcon;
    },
    purpleHeartIcon() {
      return purpleHeartIcon;
    },
  },
};
</script>

<style scoped>
#page-landing {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--color-text-in-primary);
  background: var(--color-primary);
}

.logo-container img {
  height: 10rem;
}

.hero-image {
  width: 100%;
}

.logo-container {
  text-align: center;
  margin-bottom: 3.2rem;
}

.logo-container h2 {
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 4.6rem;
  margin-top: 0.8rem;
}

.buttons-container {
  display: flex;
  justify-content: center;
  margin: 3.2rem 0;
}

.buttons-container a {
  width: 30rem;
  height: 10.4rem;
  border-radius: 0.8rem;
  font: 700 2rem Archivo;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  color: var(--color-button-text);

  transition: background-color 0.2s;
}

.buttons-container a:first-child {
  margin-right: 1.6rem;
}

.buttons-container a img {
  width: 4rem;
}

.buttons-container a.study {
  background: var(--color-primary-lighter);
}

.buttons-container a.give-classes {
  background: var(--color-secundary);
}

.buttons-container a.study:hover {
  background: var(--color-primary-light);
}

.buttons-container a.give-classes:hover {
  background: var(--color-secundary-dark);
}

.buttons-container a img {
  margin-right: 2.4rem;
}

.total-connections {
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
}

.total-connections img {
  margin-left: 0.8rem;
}

@media (min-width: 1100px) {
  #page-landing-content {
    max-width: 1100px;

    display: grid;
    grid-template-rows: 350px 1fr;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-areas:
      "logo hero hero"
      "buttons buttons total";
  }

  .logo-container {
    grid-area: logo;
    align-self: center;
    margin: 0;
    text-align: left;
  }

  .logo-container h2 {
    text-align: initial;
    font-size: 3.6rem;
  }

  .logo-container img {
    height: 100%;
  }

  .hero-image {
    grid-area: hero;
    justify-self: end;
  }

  .buttons-container {
    grid-area: buttons;
    justify-content: flex-start;
  }

  .buttons-container a {
    font-size: 2.4rem;
  }

  .total-connections {
    grid-area: total;
    justify-self: end;
  }
}
</style>
