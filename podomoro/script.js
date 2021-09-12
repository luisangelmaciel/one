new Vue({
  el: "#app",
  data(){
    return{
      status: 'mainPage',
      isWorking: false,
      isPause: true,
      isWorkingFinised: false,
      countDown:'',
      basicCount:'',
      worklist: '',
      alarmRing: '',
      workingMyAudio:'',
      count:0,
      minute: 0,
      second: 0,
      listArr:[
        // {name:'the first thing to do today',
        //  timerM:25,
        //  timerS:0,
        //  progressArr:[
        //    {tomato:1,full:false}
        //  ]
        // },
        // {name:'do yoga',
        //  timerM:30,
        //  timerS:0,
        //  progressArr:[
        //    {tomato:1,full:false}
        //  ]
        // },
        // {name:'learn SCSS',
        //  timerM:30,
        //  timerS:30,
        //  progressArr:[
        //    {tomato:1,full:false}
        //  ]
        // }
      ],
      donelistArr: [ 
        {name: 'learn Pug', 
         progressArr:[
           {tomato:1,full:true},
           {tomato:2,full:true},
           {tomato:3,full:false}
         ] 
        }
      ],
      iconArr:['list','assessment','library_music'],
      workRingToneArr:[
        {name:'None',src:''},
        {name:'Default',src:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/595322/old-mcdonald.mp3'},
//    From: https://www.youtube.com/watch?v=i5LH0Rq6FRU
//    From:https://codepen.io/gregorojstersek/pen/xLmGmM
         {name:'Hip',src:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/595322/hip.mp3'},
  //    From: http://musicpleer.audio/#!0368e03e5fd5bec0e2aff1d482954ce0
  //    From:https://codepen.io/gregorojstersek/pen/xLmGmM
        ],
      workingRingtone:'',
      workingRingtoneSrc:'',
      breakRingToneArr:[
        {name:'None',src:''},
        {name:'Default',src:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/595322/old-mcdonald.mp3'},
//    From: https://www.youtube.com/watch?v=i5LH0Rq6FRU
//    From:https://codepen.io/gregorojstersek/pen/xLmGmM
         {name:'Hip',src:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/595322/hip.mp3'},
  //    From: http://musicpleer.audio/#!0368e03e5fd5bec0e2aff1d482954ce0
  //    From:https://codepen.io/gregorojstersek/pen/xLmGmM
        ],
      breakingRingtone:'',
      breakingRingtoneSrc:'',
      progressArr:[]
    }
  },
  created(){
    this.workingRingtone = this.workRingToneArr[1].name
    this.workingRingtoneSrc = this.workRingToneArr[1].src
    this.breakingRingtone = this.breakRingToneArr[1].name
    this.breakingRingtoneSrc = this.breakRingToneArr[1].src
    this.getInitData()
  },
  computed:{
    formatSecond(){
      let second = this.second<=9?`0${this.second}`:this.second
        this.circleDisplay()
        return second
    },
    formatMinute(){
        let minute = this.minute<=9?`0${this.minute}`:this.minute
        return minute
    },
    workingList(){
      let listNmae
        if(this.listArr && this.listArr.length > 0){
          listName = this.listArr[0].name
        }else{
          listName ='you must add a new mission'
          this.progressArr=[]
        }
     
      return listName
    },
  },
  methods:{
    getInitData(){
      this.minute = this.listArr[0].timerM
      this.second = this.listArr[0].timerS
      this.count = 0
      this.basicCount = this.minute * 60 + this.second
      this.progressArr = this.listArr[0].progressArr
      this.inWorking = false
      this.isPause= true
      this.isWorkingFinised = false
    },
    addList(){
      if(this.worklist){
        if(this.listArr.some(list=>{return list.name === this.worklist})){
            alert('不能取相同名稱')
            this.worklist = ''
           return
         }
        this.listArr.push({name:this.worklist,
                           timerM:25,
                           timerS:0,
                           progressArr:[
                             {tomato:1,full:false}
                           ]
                          }
                         )  
        this.worklist = ''
        if(this.listArr.length === 1){
          this.getInitData()
        }
        document.getElementById('messageBox').style.top = '20px'   
        setTimeout(()=>{
          document.getElementById('messageBox').style.top = '-1000px'   
        },1500)
      }    
    },
    getMoreList(){
      this.status = 'list'
    },
    enterSubMenu(icontype){
      this.status = icontype
    },
    enterMainPage(){
        this.status = 'mainPage'
      this.circleDisplay()
    },
    circleDisplay(){
       this.$nextTick(()=>{
           if(this.status === 'mainPage' && !this.isWorkingFinised){
        if(this.count <= this.basicCount/2){
            document.getElementById("leftPlayCircle").style.transform = `rotate(${0+this.count*360/this.basicCount}deg)`
          }else{
            document.getElementById("leftPlayCircle").style.transform = `rotate(180deg)`
            document.getElementById("rightPlayCircle").style.opacity = 1
            document.getElementById("rightPlayCircle").style.transform = `rotate(${-180+this.count*360/this.basicCount}deg)`
          }
      }else if(this.status === 'mainPage' && this.isWorkingFinised){
                if(this.count <= this.basicCount/2){
            document.getElementById("leftPlayCircle-break").style.transform = `rotate(${0+this.count*360/this.basicCount}deg)`
          }else{
            document.getElementById("leftPlayCircle-break").style.transform = `rotate(180deg)`
            document.getElementById("rightPlayCircle-break").style.opacity = 1
            document.getElementById("rightPlayCircle-break").style.transform = `rotate(${-180+this.count*360/this.basicCount}deg)`
          }
      }
      })
    },
    getWorking(){
      let vm = this
      if(this.listArr && this.listArr.length===0){
        return
      }
      this.isWorking = !this.isWorking
      if(this.workingRingtoneSrc && this.isWorkingFinised){
        document.getElementById('workingMyAudio').pause()  
      }else if(this.breakingRingtoneSrc && !this.isWorkingFinised){
        document.getElementById('breakingMyAudio').pause()

      }
      //         //鬧鈴響起
      // if(this.workingRingtoneSrc && !this.isWorkingFinised){
      //     document.getElementById('workingMyAudio').src = this.workingRingtoneSrc
      //     document.getElementById('workingMyAudio').play()
      //   if(!this.isWorking){
      //     document.getElementById('workingMyAudio').pause()
      //   }
      // }else if(this.breakingRingtoneSrc && this.isWorkingFinised){
      //     document.getElementById('breakingMyAudio').src = this.breakingRingtoneSrc
      //     document.getElementById('breakingMyAudio').play()
      //   if(!this.isWorking){
      //     document.getElementById('breakingMyAudio').pause()
      //   }  
      // }
      this.initTime()  
    },
    initTime(){
      let vm =this
        if(this.isWorking){
         if(this.minute>0 || this.second >0){
           vm.backCount()
        }else{
          if(vm.isWorkingFinised){
              document.getElementById("rightPlayCircle-break").style.transform = `rotate(180deg)`
            }else{
              document.getElementById("rightPlayCircle").style.transform = `rotate(180deg)`      
            }
          vm.second = 0
          vm.count = 0
          vm.isWorking = false
          
          vm.isWorkingFinised = !vm.isWorkingFinised
          
          if(vm.isWorkingFinised){
            vm.minute = 5 //5
            vm.second = 0
            vm.basicCount = vm.minute*60 + vm.second
            
            let tomatoCount
             vm.listArr.forEach((list,index,arr)=>{
                if(list.name === vm.workingList){
                  tomatoCount = list.progressArr.length
                  list.progressArr[tomatoCount-1].full=true
                  list.progressArr.push({tomato:tomatoCount+1,full:false})
                }
              }) 
                        //鬧鈴響起
              if(this.workingRingtoneSrc){
                  document.getElementById('workingMyAudio').src = this.workingRingtoneSrc
                  document.getElementById('workingMyAudio').play()
                if(this.isWorking){
                  document.getElementById('workingMyAudio').pause()
                }
              }
            
            document.getElementById("leftPlayCircle").style.transform = 'rotate(0deg)'
            document.getElementById("rightPlayCircle").style.opacity = 0
            document.getElementById("rightPlayCircle").style.transform = 'rotate(0deg)'
          }else{
            vm.minute = this.listArr[0].timerM
            vm.second = this.listArr[0].timerS
            vm.basicCount = vm.minute*60 + vm.second
            document.getElementById("leftPlayCircle-break").style.transform = 'rotate(0deg)'
            document.getElementById("rightPlayCircle-break").style.opacity = 0
            document.getElementById("rightPlayCircle-break").style.transform = 'rotate(0deg)'
            if(this.breakingRingtoneSrc){
                  document.getElementById('breakingMyAudio').src = this.breakingRingtoneSrc
                  document.getElementById('breakingMyAudio').play()
              }
            // if(this.breakingRingtoneSrc){
            //   document.getElementById('breakingMyAudio').pause()
            // }
            
          }
          
        }
      }else{
        clearTimeout(this.countDown)
      }
    },
    backCount(){
      let vm = this
      if(vm.second === 0){
         vm.minute = vm.minute-1
         vm.count++
         vm.second = 59
      }
       this.countDown = setTimeout(()=>{
         this.count++
         this.second--
          if(this.second===0){
          this.initTime()
          }else if(this.second>0){
            this.backCount()
          }
       },1000)
    },
    changeWorkingList(chosenList){
      let vm = this
      //休息中不能換任務
      if(vm.isWorkingFinised){
        document.getElementById('messageBoxPlay').style.top = '20px'   
        setTimeout(()=>{
          document.getElementById('messageBoxPlay').style.top = '-1000px'   
        },1500)
        return
      }
      if(vm.isWorking){
        document.getElementById('messageBoxStop').style.top = '20px'   
        setTimeout(()=>{
          document.getElementById('messageBoxStop').style.top = '-1000px'   
        },1500)
        return
      }
      function changeIndex(listItem){
        vm.listArr.forEach((list,index,arr)=>{
          if(list.name === listItem.name){
            arr.splice(index,1)
            arr.unshift(list)
          }
        })  
      }
      
      this.listArr = this.listArr.map(list=>{
        if(list.name === this.workingList){
          list.timerM = this.minute
          list.timerS = this.second
          return list
        }else{
          return list
        }
      })
      changeIndex(chosenList)
      this.getInitData()
    },
    getWorkingRingtone(ringtone){ 
      console.log(ringtone, this.isWorkingFinised)
      if(this.isWorkingFinised){
         if(this.workingRingtone !== ringtone.name){
          //舊暫停
          if(this.workingRingtone !==  'None'){
            document.getElementById('workingMyAudio').pause()
          }
        
          //改為新
          this.workingRingtone = ringtone.name
          this.workingRingtoneSrc = ringtone.src
          if(this.workingRingtone !== 'None'){
           this.$nextTick(()=>{
              document.getElementById('workingMyAudio').src = ringtone.src
            })
            
            //如果目前為非進行中,則新的繼續play
             if(!this.isWorking){
               this.$nextTick(()=>{
                  document.getElementById('workingMyAudio').play()
               })
             
             } 
          }
        } 
      }else{
        this.workingRingtone = ringtone.name
        this.workingRingtoneSrc = ringtone.src
      }
    },
    getBreakingRingtone(ringtone){
      if(!this.isWorkingFinised){
        if(this.breakingRingtone !== ringtone.name){
          //舊暫停
          if(this.breakingRingtone !==  'None'){
            document.getElementById('breakingMyAudio').pause()  
          }
     
          //改為新
          this.breakingRingtone = ringtone.name
          this.breakingRingtoneSrc = ringtone.src
          if(this.breakingRingtone !== 'None'){
            this.$nextTick(()=>{
              document.getElementById('breakingMyAudio').src = ringtone.src
            })
            //如果目前為非進行中,則新的繼續play
            if(!this.isWorking){
               this.$nextTick(()=>{
                 document.getElementById('breakingMyAudio').play()
               })
            } 
          }
        }
      }else{
        this.breakingRingtone = ringtone.name
        this.breakingRingtoneSrc = ringtone.src
      }
    },
    getListDone(doneList,pagetype){
      if(this.isWorking){
         document.getElementById('messageBoxStop').style.top = '20px'   
        setTimeout(()=>{
          document.getElementById('messageBoxStop').style.top = '-1000px'   
        },1500)
        return
      }
      if(pagetype ==='mainPage'){
       document.getElementById('pre-circle').firstChild.style.display = 'block' 
      }
      setTimeout(()=>{
       let doneListIndex 
       let doneListDetail =[]
       this.listArr.forEach((list,index,arr)=>{
          if(list.name === doneList){
            doneListIndex = index
            doneListDetail = {name:list.name, progressArr: list.progressArr}
          }
        })
        
        this.listArr.splice(doneListIndex,1)
        this.donelistArr.unshift(doneListDetail)
         if(pagetype ==='mainPage'){
            document.getElementById('pre-circle').firstChild.style.display = 'none'
            // document.getElementById("leftPlayCircle").style.transform = 'rotate(0deg)'
            // document.getElementById("rightPlayCircle").style.opacity = 0
            // document.getElementById("rightPlayCircle").style.transform = 'rotate(0deg)'
          }
        if(this.workingRingtoneSrc){
          document.getElementById('workingMyAudio').pause()  
        }
        clearTimeout(this.countDown)
        if(this.listArr && this.listArr.length === 0){
          this.minute = 0
          this.second = 0
          this.basicCount = this.minute * 60 + this.second
          this.isPause= true
          this.count = 0
        }else{
          this.getInitData() 
        }
      },1000)    
    }
  }
})