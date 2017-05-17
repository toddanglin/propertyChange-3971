import { Observable, PropertyChangeData } from 'data/observable';

export class HelloWorldModel extends Observable {
    private _log: string;
    public get log(): string {
        return this._log;
    }
    public set log(value: string) {
        if (this._log !== value) {
            this._log = value;
            this.notifyPropertyChange("log", value);
        }
    }

    constructor() {
        super();

        this.log = "[No log msg yet]";
    }

    public onPropertyChange = (args: PropertyChangeData) => {
        let msg = `Changed Property: ${args.propertyName}, Value: ${args.value}`;

        this.log = msg;
        console.log(msg);
    }
}