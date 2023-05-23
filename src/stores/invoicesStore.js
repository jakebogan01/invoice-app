import { persisted } from "svelte-local-storage-store";

/**TESTING ONLY**/
/**REMOVE WHEN IN PRODUCTION**/
class RanId {
     id() {
          let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
          let result = "";

          for (let i = 0; i < 6; i++) {
               result += characters[Math.floor(Math.random() * characters.length)];
          }

          return result;
     }
}
const radonId = new RanId();
/**REMOVE ABOVE IN PRODUCTION**/

function getRandomDate(startDate, endDate) {
     const minValue = startDate.getTime();
     const maxValue = endDate.getTime();
     const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
     const randomDate = new Date(timestamp);
     return randomDate.toDateString().split(" ").slice(1).join(" ");
}

export const preferences = persisted("preferences", [
     {
          id: 1,
          status: "paid",
          slug: radonId.id(),
          billFromAddress: {
               street: "345 S Club House Rd",
               city: "Norfolk",
               state: "VA",
               zip: 23452,
          },
          billToAddress: {
               name: "James Gram",
               email: "james@gmail.com",
               street: "593 Suhtaia Crt",
               city: "Richmand",
               state: "VA",
               zip: 23455,
               invoiceDate: getRandomDate(new Date(2015, 0, 1), new Date()),
               dueDate: getRandomDate(new Date(2015, 0, 1), new Date()),
               description: "Graphic Design",
               items: [
                    {
                         name: "Banner Design",
                         qty: 2,
                         price: 150.0,
                         total: 300.0,
                    },
                    {
                         name: "Email Design",
                         qty: 1,
                         price: 400.0,
                         total: 400.0,
                    },
               ],
          },
     },
     {
          id: 2,
          status: "pending",
          slug: radonId.id(),
          billFromAddress: {
               street: "345 S Club House Rd",
               city: "Norfolk",
               state: "VA",
               zip: 23452,
          },
          billToAddress: {
               name: "James Gram",
               email: "james@gmail.com",
               street: "593 Suhtaia Crt",
               city: "Richmand",
               state: "VA",
               zip: 23455,
               invoiceDate: getRandomDate(new Date(2015, 0, 1), new Date()),
               dueDate: getRandomDate(new Date(2015, 0, 1), new Date()),
               description: "Graphic Design",
               items: [
                    {
                         name: "Banner Design",
                         qty: 2,
                         price: 550.0,
                         total: 1100.0,
                    },
                    {
                         name: "Email Design",
                         qty: 1,
                         price: 300.0,
                         total: 300.0,
                    },
               ],
          },
     },
     {
          id: 3,
          status: "draft",
          slug: radonId.id(),
          billFromAddress: {
               street: "345 S Club House Rd",
               city: "Norfolk",
               state: "VA",
               zip: 23452,
          },
          billToAddress: {
               name: "James Gram",
               email: "james@gmail.com",
               street: "593 Suhtaia Crt",
               city: "Richmand",
               state: "VA",
               zip: 23455,
               invoiceDate: getRandomDate(new Date(2015, 0, 1), new Date()),
               dueDate: getRandomDate(new Date(2015, 0, 1), new Date()),
               description: "Graphic Design",
               items: [
                    {
                         name: "Banner Design",
                         qty: 2,
                         price: 90.0,
                         total: 180.0,
                    },
                    {
                         name: "Email Design",
                         qty: 1,
                         price: 10.0,
                         total: 10.0,
                    },
               ],
          },
     },
]);
