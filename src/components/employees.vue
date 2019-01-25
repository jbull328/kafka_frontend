<template>
  <div class="main" id="app">
    
    <div class="card-container">
      <div class="employee-card" v-for="employee in employeesWithChanges">
        <div>{{employee.f_name }} {{employee.l_name}}</div> 
        <div>Hire date: {{employee.hire_date}}</div>  
        <font-awesome-icon icon="exclamationIcon" />
        <div class="alert">This employee had a change</div>
      </div>

      <div class="employee-card" v-for="employee in employees">
        <div>{{employee.f_name }} {{employee.l_name}}</div> 
        <div>Hire date: {{employee.hire_date}}</div>  
        
      </div>
      
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

export default {
  name: "Employees",
  data() {
    return {
      employeesWithChanges: [],
      employees: [],
      errors: [],
      exclamationIcon: faExclamationTriangle
    };
  },
  
  created() {
    axios.get('http://localhost:3000/api/employees').then((response) => {
      let responseString = response.data.key
      responseString.forEach(element => {
        element = JSON.parse(element)
        console.log(element)
        if (element.event_id==="emp_chng_02") {
          this.employeesWithChanges.push(element)
        } else {
          this.employees.push(element)
        }
      });
      console.log(this.employees);
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  components: {
    FontAwesomeIcon
  }
  
  
};
</script>

 
 <!-- Scoped component css -->
 <!-- It only affect current component -->
 <style scoped>
.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

}

.employee-card {
  display: flex;
  flex-direction: column;
  padding: 38px;
  width: 145px;
  height: 86px;
  max-width: 360px;
  margin: 40px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.employee-card:hover {
  box-shadow: 0 18px 32px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.alert {
  color: #FF4136;
  background: #001f3f;
  border: #001f3f;
}

</style>

