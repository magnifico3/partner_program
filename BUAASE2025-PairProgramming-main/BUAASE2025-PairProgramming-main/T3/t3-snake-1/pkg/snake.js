// Add these functions at the top of the file




export function greedy_snake_step(
    n,
    now_snake,
    snake_num,
    other_snakes,
    food_num,
    foods,
    round
) {
    //

    //计算所有食物到蛇头的距离选最小的
    let up = 0,
        left = 1,
        down = 2,
        right = 3;

    let dangerDirection = [];
    let forbiddenDirection = [];
    //这段表示蛇头不能走到第一节蛇身的位置
    if (now_snake[0] == now_snake[2]) {
        if (now_snake[1] < now_snake[3]) {
            forbiddenDirection.push(up);
        } else {
            forbiddenDirection.push(down);
        }
    } else {
        if (now_snake[0] < now_snake[2]) {
            forbiddenDirection.push(right);
        } else {
            forbiddenDirection.push(left);
        }
    }

    //这段表示蛇头不能走到边界
    if (now_snake[0] == 1) {
        forbiddenDirection.push(left);
    } else if (now_snake[0] == n) {
        forbiddenDirection.push(right);
    }
    if (now_snake[1] == 1) {
        forbiddenDirection.push(down);
    } else if (now_snake[1] == n) {
        forbiddenDirection.push(up);
    }
    
    /*console.log('forbidden-dirs', forbiddenDirection);
    console.log('danger-dirs', dangerDirection);*/
    //如果蛇头前进的位置上有其它蛇的第1/2/3节身体，那么蛇头不能走到那个位置
    for (let i = 0; i < snake_num; i++) {
        for (let j = 0; j < 3; j++) {
            let other_x = other_snakes[8 * i + 2 * j];
            let other_y = other_snakes[8 * i + 2 * j + 1];
            if (other_x == now_snake[0] && other_y == now_snake[1] + 1) {
                forbiddenDirection.push(up);
            } else if (other_x == now_snake[0] && other_y == now_snake[1] - 1) {
                forbiddenDirection.push(down);
            } else if (other_y == now_snake[1] && other_x == now_snake[0] + 1) {
                forbiddenDirection.push(right);
            } else if (other_y == now_snake[1] && other_x == now_snake[0] - 1) {
                forbiddenDirection.push(left);
            }
        }
    }

    //如果蛇头前进的位置可能撞到其他的蛇头，那么该位置为危险的
    for (let i = 0; i < snake_num; i++) {
        let other_x = other_snakes[8 * i];
        let other_y = other_snakes[8 * i + 1];
        if (other_x == now_snake[0] && other_y == now_snake[1] + 2) {
            dangerDirection.push(up);
        } else if (other_x == now_snake[0] && other_y == now_snake[1] - 2) {
            dangerDirection.push(down);
        } else if (other_y == now_snake[1] && other_x == now_snake[0] + 2) {
            dangerDirection.push(right);
        } else if (other_y == now_snake[1] && other_x == now_snake[0] - 2) {
            dangerDirection.push(left);
        } else if (other_x == now_snake[0] - 1 && other_y == now_snake[1] + 1) {
            dangerDirection.push(up);
            dangerDirection.push(left);
        } else if (other_x == now_snake[0] - 1 && other_y == now_snake[1] - 1) {
            dangerDirection.push(down);
            dangerDirection.push(left);
        } else if (other_x == now_snake[0] + 1 && other_y == now_snake[1] + 1) {
            dangerDirection.push(up);
            dangerDirection.push(right);
        } else if (other_x == now_snake[0] + 1 && other_y == now_snake[1] - 1) {
            dangerDirection.push(down);
            dangerDirection.push(right);
        }
    }
    let minDistance = 10000;
    for (let i = 0; i < food_num; i++) {
        let distance =
            Math.abs(now_snake[0] - foods[2 * i]) +
            Math.abs(now_snake[1] - foods[2 * i + 1]);
        if (distance < minDistance) {
            minDistance = distance;
        }
    }
    let closestFoods = [];
    for (let i = 0; i < food_num; i++) {
        let distance =
            Math.abs(now_snake[0] - foods[2 * i]) +
            Math.abs(now_snake[1] - foods[2 * i + 1]);
        if (distance == minDistance) {
            closestFoods.push([foods[2 * i], foods[2 * i + 1]]);
        }
    }
    //console.log('closest-foods', closestFoods);
    let directiongoodness = [0,0,0,0];
    

    for (let i = 0; i < closestFoods.length; i++) {
        if (closestFoods[i][0] > now_snake[0]) {
            directiongoodness[right]++;
        }
        if (closestFoods[i][0] < now_snake[0]) {
            directiongoodness[left]++;
        }
        if (closestFoods[i][1] > now_snake[1]) {
            directiongoodness[up]++;
        }
        if (closestFoods[i][1] < now_snake[1]) {
            directiongoodness[down]++;
        }
    }
    //console.log('direction-goodness', directiongoodness);
    //让first,second,third,fourth按照directiongoodness的大小排序
    let first = directiongoodness.indexOf(Math.max(...directiongoodness));
    directiongoodness[first] = -1;
    let second = directiongoodness.indexOf(Math.max(...directiongoodness));
    directiongoodness[second] = -1;
    let third = directiongoodness.indexOf(Math.max(...directiongoodness));
    directiongoodness[third] = -1;
    let fourth = directiongoodness.indexOf(Math.max(...directiongoodness));
    directiongoodness[fourth] = -1;
    let possibleDirection = [];
    let goodDirection = [];
    if (!forbiddenDirection.includes(first)) {
        possibleDirection.push(first);
    }
    if (!forbiddenDirection.includes(second)) {
        possibleDirection.push(second);
    }
    if (!forbiddenDirection.includes(third)) {
        possibleDirection.push(third);
    }
    if (!forbiddenDirection.includes(fourth)) {
        possibleDirection.push(fourth);
    }
    if (possibleDirection.length == 0) {
        return first;
    } else {
        if (snake_num == 1) {
            return possibleDirection[0];
        } else {
            for (let i = 0; i < possibleDirection.length; i++) {
                if (!dangerDirection.includes(possibleDirection[i])) {
                    goodDirection.push(possibleDirection[i]);
                }
            }
            /*console.log('possible-dirs', possibleDirection);
            console.log('good-dirs', goodDirection);*/
            if (goodDirection.length == 0) {
                return possibleDirection[0];
            } else {
                return goodDirection[0];
            }
        }
    }
}


