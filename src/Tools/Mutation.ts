import { gql } from "@apollo/client";

export const GET_TOKEN = gql`
  mutation GetToken($password: String!, $email: String!) {
    getToken(password: $password, email: $email)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser( $firstname: String!, $lastname: String!, $phone: String!, $email: String!, $password: String!, $passwordConfirm: String!) {
    createUser( firstname: $firstname, lastname: $lastname, phone: $phone, email: $email, password: $password, passwordConfirm: $passwordConfirm
    )
  }
`;

export const CREATE_ORDER = gql`
  mutation Mutation($userId: Float!, $reservations: [ReservationType!]!) {
    createOrder(userId: $userId, reservations: $reservations)
  }
`;

export const DELETE_ORDER = gql`
  mutation Mutation($orderId: Float!) {
    deleteOrder(orderId: $orderId)
  }
`;

export const VALIDATE_ORDER = gql`
  mutation Mutation($orderId: Float!) {
    validateOrder(orderId: $orderId)
  
  }
`;

export const MAKING_CONTACT = gql`
  mutation Mutation($name: String!, $email: String!, $subject: String!, $message: String!) {
    makingContact(name: $name, email: $email, subject: $subject, message: $message)
  }
`;

export const PAYMENT_SHEET = gql`
  mutation paymentSheetMobile($totalAmount: Float!) {
    paymentSheetMobile(totalAmount: $totalAmount) {
      customer
      ephemeralKeySecret
      paymentIntentId
      publishableKey
    }
  }
`;

