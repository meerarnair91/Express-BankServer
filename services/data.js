user = {
  1001: { acno: 1001, uname: "Ram", password: "userone", balance: 5000, transaction: [] },
  1002: { acno: 1002, uname: "Rahul", password: "usertwo", balance: 10000, transaction: [] },
  1003: { acno: 1003, uname: "Revathy", password: "userthree", balance: 8000, transaction: [] },
  1004: { acno: 1004, uname: "Ravi", password: "userfour", balance: 4000, transaction: [] },
  1005: { acno: 1005, uname: "Rohit", password: "userfive", balance: 7000, transaction: [] }
}


const register = (acno, uname, password) => {
  // console.log("Register Called");
  // return


  if (acno in user) {

    return {
      statusCode: 422,
      status: false,
      message: "User Already exists !!"
    }
  }
  else {
    user[acno] = {
      acno,
      uname,
      password,
      balance: 0,
      transaction: []
    }

    return {
      statusCode: 200,
      status: true,
      message: "Successfully registered"
    }
  }
}

const login = (acno, pswd) => {
  let accDetails = user
  if (acno in user) {
    if (pswd == user[acno]["password"]) {
      currentUser = user[acno]["uname"]
      currentAcc = acno

      return {
        statusCode: 200,
        status: true,
        message: "Login Successful"
      }

    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "Incorrect Password"
      }
    }
  }
  else {
    return {
      statusCode: 422,
      status: false,
      message: "No user found"
    }
  }
}

const deposit = (acno, pwd, amt) => {
  let amount = parseInt(amt)

  if (acno in user) {
    if (pwd == user[acno]["password"]) {
      user[acno]["balance"] += amount
      user[acno].transaction.push(
        {
          amount: amount,
          type: "CREDIT"
        }
      )

      return {
        statusCode: 200,
        status: true,
        message: `${amount} is successfully deposited and current balance is ${user[acno]["balance"]}`
      }
    }
    else {

      return {
        statusCode: 422,
        status: false,
        message: "Incorrect password"
      }
    }
  }

  else {

    return {
      statusCode: 422,
      status: false,
      message: "User Not Found"
    }
  }
}

const withdraw = (acno, pwd, amt) => {

  let amount = parseInt(amt)

  if (acno in user) {
    if (pwd == user[acno]["password"]) {
      if (user[acno]["balance"] > amount) {
        user[acno]["balance"] -= amount
        user[acno].transaction.push(
          {
            amount: amount,
            type: "DEBIT"
          }
        )

        return {
          statusCode: 200,
          status: true,
          message: `Amount ${amount} is successfully withdrwan with current balance ${user[acno]["balance"]}`
        }
      }

      else {

        return {
          statusCode: 422,
          status: false,
          message: "Insufficient balance"
        }
      }
    }
    else {

      return {
        statusCode: 422,
        status: false,
        message: "Incorrect password"
      }
    }
  }

  else {

    return {
      statusCode: 422,
      status: false,
      message: "User Not Found"
    }
  }
}




module.exports =
{
  register,
  login,
  deposit,
  withdraw
}

