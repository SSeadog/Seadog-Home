# Seadog_Home

## PHP를 이용한 모바일 웹페이지

- <b>사람들에게 제가 만든 컨텐츠들을 보여주기 위해 php를 이용하여 만든 모바일 웹입니다.</b>

![SH홈](https://user-images.githubusercontent.com/58541838/99921999-537a2400-2d71-11eb-9fff-a7c61ca6ed50.PNG)

## 구현사항

- <b>현재 구현한 기능으로는 php를 이용해 mysql에 저장된 유저 정보와 일치하면 로그인하는 로그인 기능과 JS로 만든 컨텐츠(이미지 조정, breakout 게임)가 있으며
  게임은 유저가 세운 기록을 db에 등록할 수 있도록 구현했습니다. 그리고 rank페이지를 만들어 다른 유저의 기록들과 비교할 수 있도록 했습니다.</b>

### 1. 로그인 기능

- <b>id를 입력하고 next버튼을 누르면 DB내의 id와 비교합니다.</b>  
  ![SH로그인1](https://user-images.githubusercontent.com/58541838/99922961-8ffc4e80-2d76-11eb-880e-441560174889.PNG)

- <b>DB안에 일치하는 id가 있으면 해당 id의 name이 보여집니다.</b>
- <b>pw를 입력하고 next버튼을 누르면 해당 id와 pw가 일치하는지 비교합니다.</b>
  ![SH로그인2](https://user-images.githubusercontent.com/58541838/99923014-fe411100-2d76-11eb-859f-d9f096bee48b.PNG)

- <b>로그인에 성공하면 홈화면에서 로그인 버튼이 유저이름과 logout버튼으로 대치됩니다.</b>
  ![SH로그아웃](https://user-images.githubusercontent.com/58541838/99923091-67c11f80-2d77-11eb-95fa-f4c7ab26b44c.PNG)

### 2. Make Something Swing(이미지 조정)컨텐츠

![SH_MIC](https://user-images.githubusercontent.com/58541838/100714199-c5e5a680-33f8-11eb-947b-71b26299c122.gif)

### 3. Break Blocks(Breakout 게임) 컨텐츠

![SH_BB](https://user-images.githubusercontent.com/58541838/100714351-fcbbbc80-33f8-11eb-8737-8b8d755306e9.gif)
