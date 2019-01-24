<template>
  <div class="main" id="app">
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">{{error}}</div>

    <div>
      <div class="employee-card">This will be the employee card</div>
    </div>
  </div>
</template>


<script>
export default {
  name: "employees",
  data() {
    return {
      loading: false,
      employee: null,
      error: null
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      this.error = this.employee = null;
      this.loading = true;

      getEmployees(this.$route.params.id, (err, employee) => {
        this.loading = false;
        if (err) {
          this.error = err.toString();
        } else {
          this.employee = employee;
        }
      });
    }
  }
};
</script>

 <style src="normalize.css/normalize.css"></style>

 <!-- Global CSS -->
 <style>
code {
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 0.9em;
  white-space: pre-wrap;
  color: #2c3e50;
}

code::before,
code::after {
  content: "`";
}
</style>

 <!-- Scoped component css -->
 <!-- It only affect current component -->
 <style scoped>
#app {
  text-align: center;
}

#app h1 {
  color: #2c3e50;
  font-weight: 300;
  margin: 0;
}

.banner {
  height: 200px;
  background-color: #f6f6f6;
  padding: 50px 10px;
}

.bottom {
  padding: 80px 10px;
  font-size: 24px;
  font-weight: 300;
}

.fade {
  font-size: 14px;
}

.logo {
  animation: spin 4s 1s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

