export interface Message {
    text: string,
    destination: "recibed" | "sent",
    timestamp: Date,
    uuid: string,
}