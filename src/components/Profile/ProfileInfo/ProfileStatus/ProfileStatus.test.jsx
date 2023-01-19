import { create } from "react-test-renderer";
import { ProfileStatusWithoutHookForm as ProfileStatus} from "./ProfileStatus";


const status = "Some nice status";
describe("Status component", () => {
    test("span should be displayed", () => {
        const component = create(<ProfileStatus status={status}/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("input should not be displayed", () => {
        const component = create(<ProfileStatus status={status}/>);
        const root = component.root;
        expect(() => {
            root.findByType("input");
        }).toThrow();
    });
    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus status={status}/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children).toEqual([status]);
    });
    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status={status} canEditStatus={true}/>);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onDoubleClick();
        expect(() => {
            root.findByType("input");
        }).not.toThrow();
    });
    test("status should be changed", () => {
        const component = create(<ProfileStatus status={status} canEditStatus={true}/>);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onDoubleClick();
        const input = root.findByType("input");
        input.props.onChange({currentTarget: {value: status + status}});
        expect(input.props.value).toBe(status + status);
    });
    test("callback should be called", () => {
        const callback = jest.fn();
        const component = create(<ProfileStatus status={status} updateUserStatus={callback} canEditStatus={true}/>);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onDoubleClick();
        const input = root.findByType("input");
        input.props.onChange({currentTarget: {value: status + status}});
        input.props.onBlur();
        expect(callback.mock.calls.length).toBe(1);
    });
});