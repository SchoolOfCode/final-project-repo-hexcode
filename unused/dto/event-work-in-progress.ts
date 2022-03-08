//sinead - just messing around with some data-transfer-oject stuff that Chris Millar suggested. Please ignore for now.

export class Event {
    name: string;
    age: number;

   constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
   }

   getName() {
     return this.name;
   }

   getAge() {
      return this.age;
   }

   asObject() {
      return {
         name: this.getName(),
         age: this.getAge(),
}