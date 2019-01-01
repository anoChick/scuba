export default class {
  static generate(){
    const LENGTH = 8;

    const WORDS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    var r = "";
    for(var i = 0; i < LENGTH; i++){
      r += WORDS[Math.floor(Math.random() * WORDS.length)];
    }
    return r;
  }
}
