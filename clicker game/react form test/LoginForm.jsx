import { useForm } from "react-hook-form";

export default function LoginForm() {
  //this is the same as const bla bla = useState
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  var user = us
  //this is where you tell the data what/were to go/do
  const onSubmit = (data) => {
    console.log("Submitted:", data);
  };

  return (
    <>
      //open the form with this
      <form onSubmit={handleSubmit(onSubmit)}>
        //this is a input
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          //the register is state and onsubmit is the setstate basicly
        />
        //this is error handleing not sure how the syntax actually works
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            //here you set the rules for the input
            minLength: { value: 6, message: "Min 6 characters" },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        {/* here is the submit button 
      it closes the form and turns the inputs into data 
      to do with as you please useing the onSubmit function */}
        <button type="submit">Login</button>
      </form>
      <h1></h1>
    </>
  );
}
