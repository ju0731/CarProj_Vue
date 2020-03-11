<template>
    <main role="main">
        <div class="navbar navbar-dark bg-dark shadow-sm">
            <div class="container d-flex justify-content-between">
                <a href="#" class="navbar-brand d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="mr-2" viewBox="0 0 24 24" focusable="false"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    <strong>Automation</strong>
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </div>
        <section class="jumbotron text-center">
            <div class="container">
                <h1>Automation Car sharing</h1>
                <p class="lead text-muted">Select your car from list below.</p>
                <p>
                    <a href="#" class="btn btn-primary my-2" @click="onClickuploadCar">차량 등록</a>
                    <a id="reservation" @click="onClickReservation" style="padding-left: 10px;"></a>
                    <a href="#" class="btn btn-secondary my-2">예약 확인</a>
                </p>
            </div>
        </section>

        <div class="album py-5 bg-light">
            <div class="container">
                <div class="row">
                </div>
            </div>
        </div>
    </main>

</template>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js" ></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
var reservename = "";
export default {
    data() {
        return {
            imageUrl: null,
        }
    },
    mounted: function() {
        axios.get('http://ec2-13-209-20-148.ap-northeast-2.compute.amazonaws.com:8090/v0.0.3/crbs', {
            })
            .then(function(response){

        for(var i=0; i<response.data.car.length; i++) {
            var url ="";
            url = localStorage.getItem(response.data.car[i].name);

            document.querySelector(".row").insertAdjacentHTML("beforeend", "<div class='col-md-4'><div class='card mb-4 shadow-sm'><svg class='bd-placeholder-img card-img-top' width='100%' height='200px' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid slice' focusable='false' role='img' aria-label='Placeholder: Thumbnail'><title>CarImage</title><image xlink:href='"+url+"' width='100%' height='100%' /></svg><div class='card-body'><p>"+response.data.car[i].name+"</p><small class='text-muted'>"+response.data.car[i].fuel+"</small><br><small class='text-muted'>"+response.data.car[i].size+"</small><p class='card-text'>"+response.data.car[i].price+"/일</p><hr class='mb-4'><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button class='btn btn-sm btn-outline-secondary' id='car"+i+"' style='width:70px' value='"+i+"'>예약</button></div><small class='badge badge-secondary badge-pill' style='width:70px;height:20px;font-size:13px;'>재고 : "+response.data.car[i].cnt+"</small></div></div></div></div>");

                document.querySelector("#car"+i).addEventListener("click", function () {
                    reservename = this.id;
                    document.querySelector("#reservation").click();
                });
            }
        });
    },
    methods: {
        onClickuploadCar() {
            this.$router.push('/admin');
        },
        onClickReservation() {
            console.log(document.querySelector("#"+reservename).value);
            this.$router.push('/reservation/'+document.querySelector("#"+reservename).value);;
        }
    }
}

</script>
