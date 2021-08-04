import TagBox, { DropDownOptions } from 'devextreme-react/tag-box';


export default function RequestedByEditor(props: any) {
    function onValueChanged(e: any) {
        props.data.setValue(e.value);
    }

    function onSelectionChanged() {
        props.data.component.updateDimensions();
    }

    return (<TagBox
        dataSource={props.data.column.lookup.dataSource}
        defaultValue={props.data.value}
        valueExpr="operationalProcessPartyId"
        displayExpr="legalName"
        showSelectionControls={true}
        maxDisplayedTags={3}
        showMultiTagOnly={false}
        applyValueMode="useButtons"
        searchEnabled={true}
        onValueChanged={onValueChanged}
        onSelectionChanged={onSelectionChanged}>
        <DropDownOptions width={300} />
    </TagBox>);
}