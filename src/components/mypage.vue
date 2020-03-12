<template>
<div>
    <center>
    <br>
    <br>
    <br>
    <br>
    <b-card
    no-body
    style="max-width: 30rem;"
    img-top
    >
    <template v-slot:header>
      <h4 class="mb-0">My page</h4>
    </template>

    <b-card-body>
      <b-card-title><div id=id>username</div>,회원님 환영합니다!</b-card-title>
      <br>
      <b-card-sub-title class="mb-2">예약현황</b-card-sub-title>
      <b-card-text>
        username 회원님은 현재, 차량예약이 완료되었습니다.
      </b-card-text>
    </b-card-body>

    <b-list-group flush>
        <hr>
      <b-list-group-item>현대 자동차 베뉴</b-list-group-item>
      <b-list-group-item>CB0001</b-list-group-item>
      <b-list-group-item>픽업 : 2020-03-05</b-list-group-item>
      <b-list-group-item>반납 : 2020-03-10</b-list-group-item>
    </b-list-group>

    <b-card-body>
      <b-button type="submit" @click="onReserDelete" block variant="primary">예약 취소</b-button>
    </b-card-body>

    <b-card-footer>bespinCar</b-card-footer>

  </b-card>
    </center>
    <br>
    <br>
    <br>
    <br>
</div>  
</template>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js" ></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import UserService from '../services/user-service.js'
export default {
  name: 'profile',
  data() {
    return {
      content: ''
    }
  },
  mounted:function() {
    UserService.getUserContent().then(
      response => {
        this.content = response.data
      },
      error => {
        alert('에러 입니다!')
        this.content = error.response.data.message
      }
    )
    // 여기에서 나의 예약 현황 뿌려주기
    axios.get('http://ec2-13-209-82-206.ap-northeast-2.compute.amazonaws.com:8090/v0.0.3/crbs/v0.0.3/crbs/mybooking/sh1010')
    .then(function(response){
      console.log(response);
    });
  },
  methods:{
    //여기는 예약 취소 api delete 잘 받았을 떄 -> alert로 예약 취소 받기
  onReserDelete(){
    axios.delete('http://ec2-13-209-82-206.ap-northeast-2.compute.amazonaws.com:8090/v0.0.3/crbs/mybooking/sh1010/CRBS0002')
  .then(function(response){
    console.log(response);
    alert('예약이 취소되었습니다 !');
  });
}
},
}
</script>