import {Switch} from 'tns-core-modules/ui/switch';
import {TextField} from 'tns-core-modules/ui/text-field';
import { EventData, PropertyChangeData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

let vm: HelloWorldModel;

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    vm = new HelloWorldModel();
    page.bindingContext = vm;

    let txt = <TextField>page.getViewById("myTxt");
    // This does work (binding textChange programmatically);
    txt.on("textChange", vm.onPropertyChange);
    
    // Trying to do this with propertyChange does NOT work
    //txt.on("propertyChange", vm.onPropertyChange);

    let toggle = <Switch>page.getViewById("mySwitch");
    // Following line is required to make binding work for Slider; declarative binding also doesn't work here
    //toggle.on("checkedChange", vm.onPropertyChange);
}

// Another test just to make sure putting handler in code behind doesn't impact results
// In my tests, it makes no difference. Still doesn't work with delcarative binding.
export function onPropChange(args: PropertyChangeData) {
    let msg = `Changed Property: ${args.propertyName}, Value: ${args.value}`;

    vm.log = msg;
    console.log(msg);
}