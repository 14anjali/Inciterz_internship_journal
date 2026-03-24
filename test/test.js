function asynTask(){
    let task1=new Promise(resolve=>{
   console.log("promise 1 run ")
   
   resolve("task 1 done")
    })

     let task2= new Promise(resolve=>{
        console.log("promise 2 run ")
        resolve("task 2 run")
    })

    let task3=new Promise(resolve=>{ 
    console.log("promise 3 run ")
    resolve("task 3 run")
    })

 let task4 = new Promise(resolve=>{
    setTimeout(()=>{
        console.log("setTimeout 1 run")
        resolve("task4 done")
    },3000)
})
      let task5=new Promise(resolve=>{
        setTimeout(()=>{
        console.log("settimeout 2 run ")
        resolve("task 5 run")
    },1500)
 } )
   
    let task6=new Promise(resolve=>{
        setTimeout(()=>{
        console.log("setTimeout 3 run")
        resolve("task6")
    },2000)
})
    return [task1,task2,task3,task4,task5,task6]
}
let tasks=asynTask()
Promise.all(tasks).then((values)=>{
    console.log(values)
})

// asynTask()