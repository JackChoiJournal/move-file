class Task {
    source: string;
    destination: string;
    extension?: string[];
    files?: string[];

    constructor(source: string, destination: string, extension?: string[], files?: string[]) {
        this.source = source;
        this.destination = destination;
        this.extension = extension;
        this.files = files;
    }
}