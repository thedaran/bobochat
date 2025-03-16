
export class Message {
    text: string;
    destination: "recibed" | "sent";
    timestamp: Date;
    uuid: string
    constructor(text: string, destination: "recibed" | "sent", uuid: string){
        this.text = text;
        this.destination = destination;
        this.timestamp = new Date(),
        this.uuid = uuid
    }
}
