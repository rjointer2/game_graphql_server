

import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.UN)

const database_configs = `mongodb+srv://${process.env.UN}:${process.env.PW}@${process.env.DB}.gwqfk.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`

export default database_configs;