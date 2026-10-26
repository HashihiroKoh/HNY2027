var onStart = false;
function OpenDoor() {
  let door = document.getElementById("door");
  let msg = document.getElementById("msg");
  door.setAttribute("visible", "false");
  msg.setAttribute("visible", "false");
  onStart = true;

  let leftDoor = document.getElementById("left");
  let rightDoor = document.getElementById("right");
  let hitsuji1 = document.getElementById("hitsuji1");
  let hitsuji2 = document.getElementById("hitsuji2");
  let hitsuji3 = document.getElementById("hitsuji3");
  let hitsuji4 = document.getElementById("hitsuji4");

  //扉が開く
  document.querySelector("#open").components.sound.playSound();
  var intervalId = setInterval(() => {
    let leftDoorPos = leftDoor.getAttribute("position");
    let rightDoorPos = rightDoor.getAttribute("position");
    leftDoor.setAttribute("position", {
      x: leftDoorPos.x - 0.03,
      y: leftDoorPos.y,
      z: leftDoorPos.z,
    });
    rightDoor.setAttribute("position", {
      x: rightDoorPos.x + 0.03,
      y: rightDoorPos.y,
      z: rightDoorPos.z,
    });
    //扉が全開したら羊が来る
    if (leftDoorPos.x < -1.4) {
      SoundOn();
      clearInterval(intervalId);
      SheepArrive();
      hitsuji3.addEventListener("animationcomplete__34", () => {
        //羊整列、アニメーション停止
        hitsuji1.removeAttribute("animation-mixer");
        hitsuji2.removeAttribute("animation-mixer");
        hitsuji3.removeAttribute("animation-mixer");
        hitsuji4.removeAttribute("animation-mixer");
        Makimono();
        setTimeout(() => {
          MakimonoRemove();
          //アニメーション開始
          hitsuji1.setAttribute("animation-mixer", "");
          hitsuji2.setAttribute("animation-mixer", "");
          hitsuji3.setAttribute("animation-mixer", "");
          hitsuji4.setAttribute("animation-mixer", "");

          SheepBack(); //9秒待って羊が戻る
        }, 9000);
      });
    }
  }, 100);
}

//3秒おきに羊が来る
function SheepArrive() {
  let hitsuji1 = document.getElementById("hitsuji1");
  let hitsuji2 = document.getElementById("hitsuji2");
  let hitsuji3 = document.getElementById("hitsuji3");
  let hitsuji4 = document.getElementById("hitsuji4");
  hitsuji1.setAttribute("visible", "true");
  hitsuji1.emit("start-trigger");
  setTimeout(() => {
    hitsuji4.setAttribute("visible", "true");
    hitsuji4.emit("start-trigger4");
  }, 3000);
  setTimeout(() => {
    hitsuji2.setAttribute("visible", "true");
    hitsuji2.emit("start-trigger2");
  }, 6000);
  setTimeout(() => {
    hitsuji3.setAttribute("visible", "true");
    hitsuji3.emit("start-trigger3");
  }, 9000);
}

function Makimono() {
  for (let i = 1; i < 5; i++) {
    let god = document.getElementById("god");
    let kador = document.getElementById("kadoR");
    let kadol = document.getElementById("kadoL");
    let hitsuji = document.getElementById("hitsuji" + i);
    let position = hitsuji.getAttribute("position");
    let posx = position.x;
    let posy = position.y;
    let posz = position.z;
    let mk = document.getElementById("maki" + i);
    switch (i) {
      case 1:
        mk.setAttribute("position", {
          x: posx + 0.06,
          y: posy + 0.47,
          z: posz + 0.2,
        });
        mk.setAttribute("rotation", "0 5 0");
        mk.setAttribute("scale", "1.05 1.05 1.05");
        break;
      case 2:
        mk.setAttribute("position", {
          x: posx + 0.03,
          y: posy + 0.5,
          z: posz + 0.28,
        });
        mk.setAttribute("rotation", "0 0 0");
        mk.setAttribute("scale", "1 1 1");
        break;
      case 3:
        mk.setAttribute("position", {
          x: posx - 0.03,
          y: posy + 0.5,
          z: posz + 0.28,
        });
        mk.setAttribute("rotation", "0 0 0");
        mk.setAttribute("scale", "1 1 1");
        break;
      case 4:
        mk.setAttribute("position", {
          x: posx - 0.1,
          y: posy + 0.52,
          z: posz + 0.35,
        });
        mk.setAttribute("rotation", "0 -5 0");
        mk.setAttribute("scale", "0.95 0.95 0.95");
        break;
    }
    mk.setAttribute("visible", "true");
    god.setAttribute("visible", "true");
    kador.setAttribute("visible", "true");
    kadol.setAttribute("visible", "true");
    document.querySelector("#dodon").components.sound.playSound();
    setTimeout(() => {
      document.querySelector("#donpahu").components.sound.playSound();
    }, 1000);
  }
}
function MakimonoRemove() {
  document.querySelector("#ki").components.sound.playSound();
  let god = document.getElementById("god");
  let kador = document.getElementById("kadoR");
  let kadol = document.getElementById("kadoL");
  for (let i = 1; i < 5; i++) {
    let mk = document.getElementById("maki" + i);
    mk.setAttribute("visible", "false");
  }
  god.setAttribute("visible", "false");
  kador.setAttribute("visible", "false");
  kadol.setAttribute("visible", "false");
}
function SheepBack() {
  let hitsuji1 = document.getElementById("hitsuji1");
  let hitsuji2 = document.getElementById("hitsuji2");
  let hitsuji3 = document.getElementById("hitsuji3");
  let hitsuji4 = document.getElementById("hitsuji4");
  let leftDoor = document.getElementById("left");

  hitsuji3.emit("end-triggr3");
  setTimeout(() => {
    hitsuji2.emit("end-triggr2");
  }, 3000);
  setTimeout(() => {
    hitsuji4.emit("end-triggr4");
  }, 6000);
  setTimeout(() => {
    hitsuji1.emit("end-triggr");
  }, 9000);

  hitsuji3.addEventListener("animationcomplete__39", () => {
    hitsuji3.setAttribute("visible", "false");
  });
  hitsuji2.addEventListener("animationcomplete__29", () => {
    hitsuji2.setAttribute("visible", "false");
  });
  hitsuji4.addEventListener("animationcomplete__49", () => {
    hitsuji4.setAttribute("visible", "false");
  });
  hitsuji1.addEventListener("animationcomplete__9", () => {
    hitsuji1.setAttribute("visible", "false");
    CloseDoor();
  });
}

//扉が閉まる
function CloseDoor() {
  let leftDoor = document.getElementById("left");
  let rightDoor = document.getElementById("right");
  let leftDoorPos = leftDoor.getAttribute("position");
  let rightDoorPos = rightDoor.getAttribute("position");
  document.querySelector("#open").components.sound.playSound();
  var intervalId2 = setInterval(() => {
    leftDoor.setAttribute("position", {
      x: leftDoorPos.x + 0.03,
      y: leftDoorPos.y,
      z: leftDoorPos.z,
    });
    rightDoor.setAttribute("position", {
      x: rightDoorPos.x - 0.03,
      y: rightDoorPos.y,
      z: rightDoorPos.z,
    });
    if (leftDoorPos.x >= -0.02) {
      clearInterval(intervalId2);
      //END表示
      let txt = document.createElement("a-text");
      txt.setAttribute("position", "-0.7 2 -6");
      txt.setAttribute("color", "white");
      txt.setAttribute("value", "END");
      txt.setAttribute("width", "15");
      document.querySelector("a-camera").appendChild(txt);
      //2秒後windowを閉じる
      setTimeout(() => {
        window.close();
      }, 2000);
    }
  }, 100);
}
//BGM
function SoundOn() {
  let sound = document.querySelector("#sound");
  sound.setAttribute("volume", "0.6");
  sound.setAttribute("loop", "false");
  document.querySelector("#sound").components.sound.playSound();
}
