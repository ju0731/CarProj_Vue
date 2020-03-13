<template>
<div>
    <b-jumbotron>
        <template v-slot:header style="text-align:left;"><div id='carname'>현대자동차 베뉴</div></template>
        <template v-slot:lead style="text-align:left;">
      도심주행에 적합한 안정적이고 편안한 주행성능이 특징이다.
진보된 첨단 지능형 주행 안전 기술 및 편의사양을 원한다면 이차를 선택하세요!
        </template>
    <b-card>
  <b-row>
        <div id='carpic'><img src="@/assets/car1.png" style="max-width: 30rem;" align="top"></div>
    
    <b-list-group >
            <p>▲ 차량 정보 </p>
            <b-list-group-item style="text-align:left;"><div id='carcnt'>재고: 1대</div></b-list-group-item>
            <b-list-group-item style="text-align:left;"><div id='carprice'>가격: 하루 7350원</div></b-list-group-item>
            <b-list-group-item style="text-align:left;"><div id='carcolor'>색깔: 검은색</div></b-list-group-item>
            <b-list-group-item style="text-align:left;"><div id='cardisplace'>연비:  11.3~16.1km</div></b-list-group-item>
            <b-list-group-item style="text-align:left;"><div id='carsize'>승차 가능인원: 최대 6명</div></b-list-group-item>
            <b-list-group-item style="text-align:left;"><div id='carfuel'>연료: 디젤</div></b-list-group-item>
    </b-list-group>
    
  <br>
    <b-col md="auto" @submit="onSubmit" v-if="show">
        <p>▲ 픽업 날짜</p>
      <b-calendar  v-model="value"  :min="min" :max="max" @context="onContext" locale="en" ></b-calendar>
    </b-col>
    <b-col md="auto" @submit="onSubmit" v-if="show">
        <p>▲ 반납 날짜</p>
      <b-calendar  v-model="value1"  :min="min" :max="max" @context="onContext" locale="en" ></b-calendar>
    </b-col>
    <b-col>
      <p>예약: <b>'{{ value }}'</b></p>
      <p>반납: <b>'{{ value1 }}'</b></p>
    </b-col>
  </b-row>
  </b-card>
  
  </b-jumbotron>
  <center>
  <b-button type="submit" variant="primary" href="#" @click="onClickreserve">예약하기</b-button>
  <b-button variant="success" to="/main">다른 차 보러가기</b-button>
  </center>
  <br>
  <br>
  <br>
  <p>{{param}}</p>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js" ></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
var attrcnt = 0;
var mind = "";
var maxd = "";

  export default {
      name:'reservartion',
      computed: {
        param: function () {
          attrcnt = this.$route.params.id;
        }
      },
    data() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // 15th two months prior
      const minDate = new Date(today)
      minDate.setMonth(minDate.getMonth())
      minDate.setDate(3)
      // 15th in two months
      const maxDate = new Date(today)
      maxDate.setMonth(maxDate.getMonth())
      maxDate.setDate(16)
      mind = minDate
      maxd = maxDate
      return {
        value: '',
        value1: '',
        min: minDate,
        max: maxDate,
        context: null,
        items: [
         { 차종: '현대자동차 베뉴', 코드: 'CB0001', 가격: '하루 73425원', 색깔: '검은색', 연료:'디젤',연비:'11.3~16.1km'}
        ],
        show: true
      }
    },
    mounted: function() {
     axios.get('http://ec2-13-209-82-206.ap-northeast-2.compute.amazonaws.com:8090/v0.0.3/crbs', {})
            .then(function(response){
            var url = "";
            url = localStorage.getItem(response.data.car[attrcnt].name);

            document.querySelector("#carname").innerHTML = response.data.car[attrcnt].name;
            document.querySelector("#carcnt").innerHTML = "재고: "+response.data.car[attrcnt].cnt+"대";
            document.querySelector("#carprice").innerHTML = "가격: 하루 "+response.data.car[attrcnt].price+"원";
            document.querySelector("#carcolor").innerHTML = "색상: "+response.data.car[attrcnt].color;
            document.querySelector("#cardisplace").innerHTML = "배기량: "+response.data.car[attrcnt].displacement;
            document.querySelector("#carsize").innerHTML = "사이즈: "+response.data.car[attrcnt].size;
            document.querySelector("#carfuel").innerHTML = "연료: "+response.data.car[attrcnt].fuel;
            document.querySelector("#carpic").innerHTML = "<img src='"+url+"' style='width: 30rem; height: 25rem;' align='left'>";
      });
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        alert("예약이 완료되셨습니다!");
      },
      onClickreserve() {
        axios.get('http://ec2-13-209-82-206.ap-northeast-2.compute.amazonaws.com:8090/v0.0.3/crbs', {})
        .then(function(response){
            axios.post('http://ec2-13-209-82-206.ap-northeast-2.compute.amazonaws.com:8090/v0.0.3/crbs/reservations', {
                "customerId" : "auto",
                "carCode" : response.data.car[attrcnt].code,
                "startDate" : mind,
                "endDate" : maxd
            })
            .then(function(response){
                alert("예약이 완료되었습니다.");
            });
       });
            this.$router.push('/main');
      }
    }
  }
</script>

