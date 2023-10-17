const board = document.getElementById('board')
let grid = []
let chance = -1
let moves = 0

let DIM = 9
init()

function init(){
    let dimy = Math.floor(window.innerHeight)
    let dimx = Math.min(6,Math.floor(window.innerWidth*DIM/dimy))
    board.style.left = `${Math.floor((window.innerWidth/2) - ((dimy*dimx)/(DIM*2)))}px`
    for(let i = 0; i < DIM; i++){
        let mrkp = `<div class="row">`
        grid.push([])
        for(let j = 0; j < dimx; j++){
            mrkp += `<div class="tile" id="${i}${j}" style="width: ${(dimy/DIM)-8}px; height: ${(dimy/DIM)-8}px" onclick="add(${i},${j})"></div>`
            grid[i].push(0)
        }
        mrkp += `</div>`
        board.insertAdjacentHTML('beforeend',mrkp)
    }
    show()
}

function add(i,j){
    if(grid[i][j]*chance >= 0){
        grid[i][j] += chance
        setTimeout(update,500)
        show()
        moves += 1
        chance *= -1
        document.body.style.backgroundColor = 'rgb(20,0,0)'
        if(chance == 1){
            document.body.style.backgroundColor = 'rgb(0,20,0)'
        }
    }
}
function update(){
    let ch;
    let f = false
    for(let i = 0; i < grid.length; i ++){
        for(let j = 0; j < grid[0].length; j ++){
            if(grid[i][j] < 0){ch = -1}
            if(grid[i][j] > 0){ch = 1}
            if((i == 0 || i == grid.length - 1) && (j == 0 || j == grid[0].length - 1)){
                if(Math.abs(grid[i][j]) >= 2){
                    if(i == 0){
                        grid[i + 1][j] = ch*(Math.abs(grid[i + 1][j])) + ch
                    }
                    if(i == grid.length - 1){
                        grid[i - 1][j] = ch*(Math.abs(grid[i - 1][j])) + ch
                    }
                    if(j == 0){
                        grid[i][j + 1] = ch*(Math.abs(grid[i][j + 1])) + ch
                    }
                    if(j == grid[0].length - 1){
                        grid[i][j - 1] = ch*(Math.abs(grid[i][j - 1])) + ch
                    }
                    grid[i][j] = (Math.abs(grid[i][j]) - 2) * ch
                    show()
                    setTimeout(update,500)
                    f = true
                    break
                }
            }
            else if(i == 0 || i == grid.length - 1   || j == 0 || j == grid[0].length - 1){
                if(Math.abs(grid[i][j]) >= 3){
                    if(i == 0){
                        grid[i + 1][j] = ch*(Math.abs(grid[i + 1][j])) + ch
                        grid[i][j - 1] = ch*(Math.abs(grid[i][j - 1])) + ch
                        grid[i][j + 1] = ch*(Math.abs(grid[i][j + 1])) + ch
                    }
                    if(i == grid.length - 1){
                        grid[i - 1][j] = ch*(Math.abs(grid[i - 1][j])) + ch
                        grid[i][j - 1] = ch*(Math.abs(grid[i][j - 1])) + ch
                        grid[i][j + 1] = ch*(Math.abs(grid[i][j + 1])) + ch
                    }
                    if(j == 0){
                        grid[i][j + 1] = ch*(Math.abs(grid[i][j + 1])) + ch
                        grid[i - 1][j] = ch*(Math.abs(grid[i - 1][j])) + ch
                        grid[i + 1][j] = ch*(Math.abs(grid[i + 1][j])) + ch
                    }
                    if(j == grid[0].length - 1){
                        grid[i][j - 1] = ch*(Math.abs(grid[i][j - 1])) + ch
                        grid[i - 1][j] = ch*(Math.abs(grid[i - 1][j])) + ch
                        grid[i + 1][j] = ch*(Math.abs(grid[i + 1][j])) + ch
                    }  
                    grid[i][j] = (Math.abs(grid[i][j]) - 3) * ch
                    show()
                    setTimeout(update,500)
                    f = true  
                    break    
                }
            }
            else{
                if(Math.abs(grid[i][j]) >= 4){
                    grid[i][j + 1] = ch*(Math.abs(grid[i][j + 1])) + ch
                    grid[i][j - 1] = ch*(Math.abs(grid[i][j - 1])) + ch
                    grid[i - 1][j] = ch*(Math.abs(grid[i - 1][j])) + ch
                    grid[i + 1][j] = ch*(Math.abs(grid[i + 1][j])) + ch
                    grid[i][j] = (Math.abs(grid[i][j]) - 4) * ch
                    show()
                    setTimeout(update,500)
                    f = true
                    break
                }
            }
        }
        if(f){
            break
        }
    }
    if(!f){
        check()
    }
}
function show(){
    for(let i = 0; i < grid.length; i ++){
        for(let j = 0; j < grid[0].length; j ++){
            let ob = document.getElementById(`${i}${j}`)
            if(grid[i][j]<0){
                let m = ''
                for(let k = 1; k < Math.abs(grid[i][j])+1; k++){
                    let sc = 1
                    if(k != 1){sc = 0.8}
                    m += `<div class="intile" style="width: inherit;height: inherit;scale: ${sc};background-color: rgb(${k*70}, 0, 0);z-index: ${k + 1}">`
                }
                m += `</div>`.repeat(Math.abs(grid[i][j]))
                ob.innerHTML = m
            }
            else if(grid[i][j]>0){
                let m = ''
                for(let k = 1; k < grid[i][j]+1; k++){
                    let sc = 1
                    if(k != 1){sc = 0.8}
                    m += `<div class="intile" style="width: inherit;height: inherit;scale: ${sc};background-color: rgb(0, ${k*50}, 0);z-index: ${k + 1}">`
                }
                m += `</div>`.repeat(grid[i][j])
                ob.innerHTML = m
            }
            else{
                ob.innerText = ''
            }
        }
    }
}
function check(){
    let r = false
    let g = false
    for(let i = 0; i < grid.length; i ++){
        for(let j = 0; j < grid[0].length; j ++){
            if(grid[i][j]<0){
                r = true
            }
            if(grid[i][j]>0){
                g = true
            }
        }
    }
    if(!r && moves > 2){
        alert("Green Won The Game !!")
        location.reload()
    }
    else if(!g && moves > 2){
        alert("Red Won The Game !!")
        location.reload()
    }
}