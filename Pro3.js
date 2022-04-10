new Vue({
    data(){
      return{
        txt:'',
        desc:'',
        data:'',
        c:'',
        st:'percentage',
        x: 500,
        y: 400
      }
    },
    mounted(){
      var vm = this
      vm.setGraphSize();  
      google.charts.load("visualization", "1", {packages:["corechart"]});
      google.charts.setOnLoadCallback(vm.drawChart);
    },
    methods:{
      setGraphSize(){
        var vm = this, 
            w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            xx = w.innerWidth || e.clientWidth || g.clientWidth;
        if( xx<577 )
          for(var i=0; i<7; i++)
            {
              vm.x*=0.9;
              vm.y*=0.9;
            }
      },
      OnDraw(){
        var vm = this
        vm.drawChart();
      },
      OnReset(){
        var vm = this;
        
        vm.x=580
        vm.y=400
        vm.setGraphSize();
        var imgContainer = document.getElementById('img_div');
        while (imgContainer.firstChild) {
          imgContainer.removeChild(imgContainer.firstChild);
        }
        setTimeout(function(){
          vm.OnDraw();
        }, 100);
        document.gen.reset();
      },
      OnCopy(){
        alert("Press Save button and open image viewer to copy graph");
      },
      OnPrint(){
        alert("Press Save button and open image viewer to print graph");
      },
      OnZoomOut(){
        var vm = this;
        vm.x*=0.9;
        vm.y*=0.9;
        vm.OnDraw();
      },
      OnZoomIn() {
        var vm = this
        vm.x/=0.9;
        vm.y/=0.9;
        vm.OnDraw();
      },
      drawChart() {
        
        var vm = this, 
            arr=new Array();
        var txt =vm.txt
        if( txt=='' ) txt="My Title";
        var desc = vm.desc;
        if( desc=='' ) desc="name_1 name_2 name_3 name_4 name_5".split(' ');
        
        var data = vm.data
        if( data=='' ){
          data= "300 500 100 200 200".split(' ');
        }
        
        arr[0]=['Task', 'Hours per Day'];
        var data1 = data.split(' '),
            data2 = desc.split(' ')
        for(var i=0; i< data1.length; i++)
          arr[i+1]=[data2[i], parseFloat(data1[i])];
        var data2 = google.visualization.arrayToDataTable(arr);
        
        var options = {
          title: vm.txt,
          pieSliceText: vm.st,
          is3D: vm.c,
          width: vm.x,
          height: vm.y
        };
        var chart = new google.visualization.PieChart(vm.$refs.chart_div);
        google.visualization.events.addListener(chart, 'ready', function () {
          var data=chart.getImageURI();
          $("#download").prop("href", data);
          $("#download").click();
        });
        chart.draw(data2, options);
      }
    }
  }).$mount('#app')
  