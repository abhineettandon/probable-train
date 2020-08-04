import { connect } from 'mongoose';

export const connectDatabase = () => {
  connect(process.env.DB_URL as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log(`Database connected Successfully`))
    .catch(err => console.log(`Database connection error: `, err));
}
