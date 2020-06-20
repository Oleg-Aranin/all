import * as React from 'react';
import { User } from 'oidc-client';
import { RouteComponentProps, Link } from 'react-router-dom';
import { FormRenderer } from '@bentley/formsrenderer/';
import { IFormWrapper } from '@bentley/formsrenderer/lib/form-renderer/interfaces/IFormsSchema';
import {
    IRenderOptions,
    IServiceSuccessFunction,
    IServiceErrorFunction,
} from '@bentley/formsrenderer/lib/form-renderer/interfaces/IRendererConfigurationOptions';
import {
    WsgDataType,
    WsgClassType,
    IWsgInstanceList,
    IWsgProjectMember,
    IWsgRelationshipInstance,
} from '@bentley/formsrenderer/lib/form-renderer/interfaces/IWsgSchemas';
import { RendererElement } from '@bentley/formsrenderer/lib/form-renderer/components/RendererElement/RendererElement';
import { INameValuePair, IWsgInstance, IWsgWorkflowDefinition } from '../../api/models/WSG.models';
import { FormDefinition } from '../../api/models/Fdm.models';
import { Spinner } from '../spinner/spinner';
import { AttachmentGrid } from '../attachments-grid/attachments-grid';
import { InstanceDefenitionConstants } from '../types/instance-def-type';
import { saveAs } from 'file-saver';
import { IAttachmentForSave } from '../attachments-grid/attachment';
import { parseDate, isValidDate } from '../../utils/dates';
import { WithTranslation } from 'react-i18next';
import { LayoutMode } from '../types/layout-mode';
import { VisualControlFormField } from './custom-form-fields/visual-control-form-field';
import { FdmEditFormFieldsContainer } from './fdm-edit-form-fields-container';
import { InitialCameraView } from '@bentley/map-layer-service';
import { AjaxState } from '../../components/reducers/utils';
import { Coordinates } from './coordinates/coordinates';
import { callResizeEvent } from '../../utils/table';
import { MarkerInstance } from '@bentley/synchro-modelviewer';
import { MarkerType } from '@bentley/synchro-modelviewer/lib/Markers';
import { imageBlobThumbnail } from '../../utils/image-resize';
import { FormDefinitionsByInstanceId } from '../../components/reducers/form-definitions/reducer';
import { Position3D } from '../../api/issues/model-position';
import { ProjectShareFile } from '../../api/share/share-file';
import { openFilePicker } from '@bentley/doc-service-sdk';
import { FilePicker } from '@bentley/picker-types';

import './fdm-edit-form.scss';
import Button from '../button/button';
import { FormView } from './fdm-edit-map-and-model-type';
import _ from 'lodash';
import { IModal } from '@bentley/formsrenderer/lib/form-renderer/components/Modal/Modal';

export interface RelatedInstance<T> {
    instanceId: string;
    className: string;
    properties: T;
}

export interface ProjectShareLink {
    downloadUrl: string;
    fileSize: number;
    id: string;
    isFolder: boolean;
    lastModifiedById: string;
    lastModifiedByName: string;
    lastModifiedDate: string;
    name: string;
    repository: {
        location: string;
        type: string;
    };
}

export interface ExternalFile {
    ItemId: string;
    BackItemUrl: string;
    DataItemUrl: string;
}

export interface AdditionalFDMUpdateFormProps {
    updateMode: boolean;
    fdmEditFormFileLimit: string;
    fdmEditFormFormNotFound: string;
    fdmEditFormFormLinkedFormText: string;
    coordinatesLatitudeLabel: string;
    coordinatesLongitudeLabel: string;
    modelMarkerType: MarkerType;
}

type FormsWSGApi = {
    getAllProjectMembers: (projectGuid: string, user?: User) => Promise<any>;
    downloadAttachment: (attachmentId: string, projectGuid: string, user?: User) => Promise<Blob>;
    downloadLink: (accessUrl: string) => Promise<Blob>;
    getFormDefinition: (
        projectGuid: string,
        formDefinitionId: string,
        user?: User,
    ) => Promise<IWsgInstance<FormDefinition>[]>;
};

export interface FDMEditInstanceFormReduxStateProps {
    activeProjectId: string;
    formsWsgUser: User;
    client: FormsWSGApi;
    formDefinitionsIsLoading: boolean;
    formDefinitions: FormDefinitionsByInstanceId;
    username: string;
    layout: LayoutMode;
    mapLayerServiceBuddiUrl: string;
    isMapViewEnabled: boolean;
    isModelViewEnabled: boolean;
    sideViewOpen: boolean;
    openConstructionPlannerUrl: string;
    contextServiceUrl: string;
    projectWiseDocumentServiceURL: string;
    iModelContextAjaxState: AjaxState<any>;
    modelImage: string;
}

export interface FDMEditInstanceFormBaseProps {
    instanceTypeConstants: InstanceDefenitionConstants;
    commonProps: AdditionalFDMUpdateFormProps;
    formNotFound: boolean;
    instance: IWsgInstance<WsgClassType>;
    workflowDefinition: IWsgWorkflowDefinition;
    isInstanceLoading: boolean;
    newAttachments: RelatedInstance<IAttachmentForSave>[];
    modelThumbnailImageDataAjaxState: AjaxState<Blob>;
    mapThumbnailImageDataAjaxState: AjaxState<Blob>;
    attachmentsIdToDelete: string[];
    linksInInstance: IWsgInstance<ProjectShareFile>[];
    newLinks: IWsgInstance<ProjectShareFile>[];
    linksIdToDelete: string[];
    isFormToShareLinkEnabled: boolean;
    onFormFound: (formId: string) => any;
    onFormNotFound: () => any;
    onInstanceUpdate: (instance: IWsgInstance<WsgClassType>) => any;
    onAttachmentUpload: (file: ArrayBuffer, fileName: string, caption?: string, isModel?: boolean) => void;
    onAttachmentRemove: (attachmentId: string) => void;
    onShowSideViewClick: (view?: FormView) => void;
    onMapDescriptionChange: (event?: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onMapPositionChange: (position: number[]) => void;
    onModelDescriptionChange: (event?: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onModelPositionChange: (markerInstance: MarkerInstance, viewDefinition?: string) => void;
    onModelAttachmentDelete: () => void;
    onProjectShareLinkCreated: (link: ProjectShareLink) => void;
    onOpenProjectShareLink: (link: IWsgInstance<ProjectShareFile>) => void;
    onProjectShareLinkRemove: (attachmentId: string) => void;
}

export interface FDMEditInstanceFormReduxDispatchProps {
    loadFormDefinitions: (formsWsgUser: User, client: FormsWSGApi, activeProjectId: string) => any;
    loadModelContext: () => void;
    setMapDisplay: (formView: FormView) => any;
    setModelViewLoading: (loading: boolean) => any;
}

export interface FDMEditInstanceFormProps
    extends FDMEditInstanceFormReduxStateProps,
        FDMEditInstanceFormReduxDispatchProps,
        FDMEditInstanceFormBaseProps,
        RouteComponentProps<any>,
        WithTranslation {}

export interface FDMEditInstanceFormState {
    view: FormView;
    isModelViewLoading: boolean;
    folderPickerIsOpen: boolean;
    selectedFolderId: string;
    modelImage: string;
}

export class FDMEditInstanceForm extends React.Component<FDMEditInstanceFormProps, FDMEditInstanceFormState> {
    private $fileUploadDiv!: JQuery<HTMLElement>;
    private editableProperties: string[];
    private userPermissions: string[];
    private startStatus: string;
    private requiredPermissions: boolean;
    private isFormClosed: boolean;
    public formContainer: React.RefObject<any>;

    constructor(props: FDMEditInstanceFormProps) {
        super(props);
        this.requiredPermissions = false;
        this.isFormClosed = false;

        if (props.instance) {
            this.isFormClosed = this.props.instance.properties.Closed as boolean;
        }

        this.state = {
            view: FormView.Default,
            isModelViewLoading: false,
            folderPickerIsOpen: false,
            selectedFolderId: undefined,
            modelImage: null,
        };
        this.formContainer = React.createRef();
    }

    componentDidMount() {
        const isLoaded: boolean = this.isLoadedForm(this.props);
        if (!this.props.formDefinitions && this.props.formsWsgUser && this.props.client && this.props.activeProjectId) {
            this.props.loadFormDefinitions(this.props.formsWsgUser, this.props.client, this.props.activeProjectId);
        } else if (isLoaded) {
            this.renderForm(this.getFormDefinitionIdForIssue());
        }
        if (
            this.props.activeProjectId &&
            !(
                this.props.iModelContextAjaxState.data &&
                this.props.iModelContextAjaxState.data.projectId === this.props.activeProjectId
            )
        ) {
            this.props.loadModelContext();
        }
    }

    private getEditableProperties() {
        if (this.props.workflowDefinition) {
            let instanceStatus: string;

            if (this.props.instance && this.props.instance.properties['Status']) {
                instanceStatus = this.props.instance.properties['Status'].toString();

                this.userPermissions = this.getUserPermissions();
                const transitions: any = this.props.workflowDefinition.properties.Transitions;

                this.requiredPermissions = this.doesUserHaveRequiredPermission(
                    transitions,
                    this.userPermissions,
                    instanceStatus,
                );
            } else {
                instanceStatus = this.props.workflowDefinition.properties.StartStates[0];
                this.startStatus = instanceStatus;
                this.requiredPermissions = true;
            }

            for (let i = 0; i < this.props.workflowDefinition.properties.States.length; i++) {
                if (this.props.workflowDefinition.properties.States[i].Name == instanceStatus) {
                    this.editableProperties = this.props.workflowDefinition.properties.States[i].EditableProperties;
                    break;
                }
            }
        } else {
            this.requiredPermissions = true;
        }
    }

    private doesUserHaveRequiredPermission(
        workFlowTransitions: any,
        userPermissions: string[],
        instanceStatus: string,
    ): boolean {
        for (let i = 0; i < workFlowTransitions.length; i++) {
            if (workFlowTransitions[i].Start === instanceStatus) {
                const permissions: string[] = workFlowTransitions[i].Permissions;
                for (let j = 0; j < permissions.length; j++) {
                    if (userPermissions.indexOf(permissions[j]) > -1) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private getUserPermissions(): string[] {
        let permissions: string[] = [];

        if ((this.props.instance as any).relationshipInstances) {
            for (let i = 0; i < (this.props.instance as any).relationshipInstances.length; i++) {
                if ((this.props.instance as any).relationshipInstances[i].className == 'FormData') {
                    permissions = (this.props.instance as any).relationshipInstances[i].relatedInstance.properties
                        .UserPermissions;
                    break;
                }
            }
        }

        return permissions.length > 0 ? permissions : undefined;
    }

    public componentWillUnmount(): void {
        this.clearFormFromDom();
    }

    private isLoadedForm(props: FDMEditInstanceFormProps): boolean {
        return (
            !(
                props.isInstanceLoading ||
                props.formDefinitionsIsLoading ||
                this.props.iModelContextAjaxState.isLoading
            ) &&
            !!props.formDefinitions &&
            !this.props.iModelContextAjaxState.isLoading &&
            this.props.iModelContextAjaxState.data &&
            this.props.iModelContextAjaxState.data.projectId === this.props.activeProjectId
        );
    }

    private getFormDefinitionIdForIssue(): string {
        const matchFn = this.props.instanceTypeConstants.formName
            ? (formDef: IWsgInstance<FormDefinition>) =>
                  formDef.properties.Name === this.props.instanceTypeConstants.formName
            : (formDef: IWsgInstance<FormDefinition>) =>
                  formDef.properties.ClassName === this.props.instanceTypeConstants.className &&
                  formDef.properties.Classification === this.props.instanceTypeConstants.classification;
        const formDefinition = Object.keys(this.props.formDefinitions)
            .map((formId: string) => this.props.formDefinitions[formId])
            .find(matchFn);
        if (formDefinition) {
            this.props.onFormFound(formDefinition.properties.FormId);
            return formDefinition.properties.FormId;
        }
        this.props.onFormNotFound();
        return '';
    }

    componentDidUpdate(prevProps: FDMEditInstanceFormProps) {
        const isLoaded: boolean = this.isLoadedForm(this.props);
        const wasLoaded: boolean = this.isLoadedForm(prevProps);
        if (
            (isLoaded && !wasLoaded) ||
            (isLoaded && this.props.iModelContextAjaxState.data !== prevProps.iModelContextAjaxState.data)
        ) {
            this.renderForm(this.getFormDefinitionIdForIssue());
        } else if (
            this.props.activeProjectId !== prevProps.activeProjectId &&
            !this.props.formDefinitions &&
            this.props.activeProjectId
        ) {
            this.props.loadFormDefinitions(this.props.formsWsgUser, this.props.client, this.props.activeProjectId);
        }
        if (isLoaded && prevProps.layout !== this.props.layout) {
            // this.renderForm(this.getFormDefenitionIdForIssue());
            if (this.props.layout === 'mobile') {
                $('.renderer-form').css({ width: 'calc(100% )' });
            } else {
                $('.renderer-form').css({ width: 'calc(100% )' });
            }
        }
        if (
            !this.props.iModelContextAjaxState.isLoading &&
            this.props.activeProjectId &&
            ((this.props.iModelContextAjaxState.data &&
                this.props.iModelContextAjaxState.data.projectId !== this.props.activeProjectId) ||
                (!this.props.iModelContextAjaxState.data && !this.props.iModelContextAjaxState.error))
        ) {
            this.props.loadModelContext();
        }
    }

    private onFormEdited = (
        changedData: Array<INameValuePair<WsgDataType>>,
        instance: IWsgInstance<WsgClassType>,
    ): void => {
        // TODO: For now we just get the first instance of the array.  I'm not sure of the use case for having more than one binding.
        if (changedData.length < 1 || (changedData[0] as any).name == null) {
            console.warn('Failed to get any data from Renderer update.');
            return;
        }
        // commenting this code, because it does not make sense to conditionally copy properties
        // delete later if new code is stable
        // if (
        //     !this.props.commonProps.updateMode &&
        //     this.props.instance &&
        //     (this.props.instance as any).relationshipInstances
        // ) {
        //     // instance = {
        //     //     ...instance,
        //     //     properties: {
        //     //         ...(this.props.instance || { properties: {} }).properties,
        //     //         ...instance.properties,
        //     //     },
        //     //     relationshipInstances: (this.props.instance as any).relationshipInstances,
        //     // } as IWsgInstance<WsgClassType>;
        // }
        const clone = _.cloneDeep(this.props.instance);
        instance = _.merge(clone, instance);
        this.props.onInstanceUpdate(instance);
    };

    private getProjectMembers = (
        successCallback: IServiceSuccessFunction<IWsgInstanceList<IWsgProjectMember>>,
        errorCallback: IServiceErrorFunction,
    ): void => {
        this.props.client.getAllProjectMembers(this.props.activeProjectId, this.props.formsWsgUser).then(
            (result: IWsgInstance<IWsgProjectMember>[]) => {
                successCallback({ instances: result }, null, null, null);
            },
            error => {
                errorCallback(error.data.errorId, error.data.errorMessage);
            },
        );
    };

    private modifyRenderedElement = (element: RendererElement, $element: JQuery, binding: string) => {
        const { t } = this.props;

        if (this.isFormClosed) {
            element.setIsDisabled(true);
        } else if (this.props.workflowDefinition && binding && binding === 'Status') {
            if (!this.props.instance) {
                $element.prop('defaultValue', this.startStatus);
            }
            element.setIsDisabled(true);
        } else if (!$element.is(':disabled')) {
            // Makes datepicker input readonly so users can't input an invalid date.
            if ($element.is('.renderer-date-picker')) {
                $element.prop('readonly', true);
                if (binding === '_DueDate') {
                    let date: Date = new Date();

                    if (this.props.instance) {
                        const currentSetDate: Date = this.props.instance.properties[binding]
                            ? parseDate(this.props.instance.properties[binding] as string, 'utc')
                            : undefined;
                        if (currentSetDate && currentSetDate < date) {
                            date = currentSetDate;
                        }
                    }

                    ($element as any).datepicker('setStartDate', date);
                }
                // BWC overrides :readonly attribute and sets it more like :disabled. This reverts the BWC change.
                $element.css({ cursor: 'default', 'background-color': 'transparent', color: 'inherit' });

                const value = this.props.instance ? this.props.instance.properties[binding] : undefined;
                const date = value
                    ? parseDate(this.props.instance.properties[binding] as string, 'utc')
                    : binding === 'DateIdentified'
                    ? // displays today's date as the default date identified
                      // Bug: if the user clicks on the date identified box and clicks off of it without selecting a date,
                      //      the box reverts to displaying 'yyyy-mm-dd'
                      new Date()
                    : undefined;
                if (isValidDate(date)) {
                    try {
                        ($element as any).datepicker('update', date);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }

            if ($element.is('.renderer-image-drop')) {
                element.setIsDisabled(false);
            }

            if ($element.is('.renderer-data-structure-container')) {
                $element.empty();
            }

            if ($element.is('.renderer-attachment-upload-button')) {
                element.setIsDisabled(false);

                this.$fileUploadDiv = $('<div>');
                this.$fileUploadDiv.text(t<string>(this.props.commonProps.fdmEditFormFileLimit));
                this.$fileUploadDiv.css({ 'font-size': '12px', color: '$bwc-gray', 'padding-left': '2px' });
                $element.filter('button.renderer-attachment-upload-button').before(this.$fileUploadDiv);
            }

            if ($element.is('.renderer-labeled-control.renderer-layout.renderer-flow') && binding === 'AssignedToId') {
                const dropdown = $element.children('.renderer-select-list.renderer-layout.renderer-flow').children();
                dropdown.prop('defaultValue', this.props.username);
            }
        }
    };

    private onDownloadAttachment = async (instanceId: string) => {
        const attachment: IAttachmentForSave = this.getAttachmentById(instanceId);

        if (attachment) {
            if ((attachment as any).File) {
                //new instance mode
                saveAs(new Blob([(attachment as any).File]), attachment.Name);
            } else {
                const attachmentBlob = await this.props.client.downloadAttachment(
                    instanceId,
                    this.props.activeProjectId,
                    this.props.formsWsgUser,
                );
                saveAs(attachmentBlob, attachment.Name);
            }
        }
    };
    private handleRequestLinkThumbnailUrl = async (instance: IWsgInstance<ProjectShareFile>): Promise<string> => {
        const blob = await this.props.client.downloadLink(instance.properties.AccessUrl);
        return imageBlobThumbnail(blob, 70, 55, 1.5);
    };

    private onDownloadLink = async (instanceId: string) => {
        const link = this.getLinkById(instanceId);
        if (link) {
            this.props.onOpenProjectShareLink(link);
        }
    };

    private async renderForm(formId: string) {
        try {
            if (!formId) {
                return;
            }

            const formDefinition = Object.keys(this.props.formDefinitions)
                .map((instanceId: string) => this.props.formDefinitions[instanceId])
                .find(formDef => formDef.properties.FormId === formId);
            const formToRender: IFormWrapper = JSON.parse(formDefinition.properties.Definition);
            this.getEditableProperties();

            const options: Partial<IRenderOptions> = {
                projectId: this.props.activeProjectId,
                // Subtracting 10 is an attempt at preventing scroll bars from overlapping the form,
                // Alternative: https://stackoverflow.com/questions/18548465/prevent-scroll-bar-from-adding-up-to-the-width-of-page-on-chrome
                containerWidth: this.formContainer.current.offsetWidth - 20,
                shouldScale: false,
                onInstanceDataChange: this.onFormEdited as any,
                getUsersForProject: this.getProjectMembers,
                onElementRenderComplete: this.modifyRenderedElement,
                onAttachmentUpload: this.props.onAttachmentUpload as any,
                onAttachmentUploadClick: this.onAttachmentUploadClick,
                userPermissions: this.userPermissions,
            };

            this.clearFormFromDom();
            let renderedForm = null;
            if (this.props.instance) {
                const instance = JSON.parse(JSON.stringify(this.props.instance));
                renderedForm = FormRenderer.render(formToRender, options, [instance]);
            } else {
                renderedForm = FormRenderer.render(formToRender, options);
            }

            $(this.formContainer.current).append(renderedForm);
            if (this.props.layout === 'mobile') {
                $('.renderer-form').css({ width: 'calc(100% )' });
                // File upload button at Daily Log form has style calc(30% - 16px)
                // it works incorrect at mobile
                $('.renderer-attachment-upload').css({ width: 'calc(50% - 16px)' });
            } else {
                $('.renderer-form').css({ width: 'calc(100% )' });
            }
        } catch (e) {
            console.warn(e);
            this.clearFormFromDom();
            const displayNode = document.createElement('div');
            const text = document.createTextNode(e);
            displayNode.appendChild(text);
            this.formContainer.current.appendChild(displayNode);
        }
    }

    private onAttachmentUploadClick = (event: JQueryEventObject, attachmentUploadModal: IModal) => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        attachmentUploadModal.registerOnAcceptCallback(() => {}, false);
    };

    //https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    private clearFormFromDom = () => {
        if (!this.formContainer || !this.formContainer.current) {
            return;
        }
        while (this.formContainer.current.firstChild) {
            this.formContainer.current.removeChild(this.formContainer.current.firstChild);
        }
        this.props.setMapDisplay(FormView.Default);
    };

    private getAttachmentById(instanceId: string): IAttachmentForSave {
        let attachment: IAttachmentForSave = null;
        if (this.props.instance && (this.props.instance as any).relationshipInstances) {
            (this.props.instance as any).relationshipInstances
                .filter(
                    (item: any) =>
                        item.relatedInstance.className === 'Attachment' && item.relatedInstance.properties.Size,
                )
                .forEach((item: any) => {
                    if (item.relatedInstance.instanceId === instanceId) {
                        attachment = item.relatedInstance.properties;
                    }
                });
        }
        return attachment;
    }

    private getLinkById(instanceId: string): IWsgInstance<ProjectShareFile> {
        const link: IWsgInstance<ProjectShareFile> = this.getLinksFromInstance().instances.find(
            item => item.instanceId === instanceId,
        );
        return link;
    }

    private getAttachmentsFromInstance(): IWsgInstanceList<IAttachmentForSave> {
        let attachments: IWsgInstanceList<IAttachmentForSave> = null;
        if (this.props.instance && (this.props.instance as any).relationshipInstances) {
            attachments = {
                instances: (this.props.instance as any).relationshipInstances
                    //remove related items that isn't attachments form, comments
                    .filter(
                        (item: any) =>
                            item.relatedInstance.className === 'Attachment' && item.relatedInstance.properties.Size,
                    )
                    .map((item: any) => item.relatedInstance)
                    //remove items that prepared to delete
                    .filter(
                        (item: RelatedInstance<IAttachmentForSave>) =>
                            !this.props.attachmentsIdToDelete.find(id => id === item.instanceId),
                    )
                    // add newly attached files
                    .concat(this.props.newAttachments),
            };
        } else {
            attachments = {
                instances: this.props.newAttachments as IWsgInstance<IAttachmentForSave>[],
            };
        }
        return attachments;
    }

    private getLinkedForm(): IWsgInstance<any> {
        let linkedForm: IWsgInstance<any> = null;
        if (this.props.instance && (this.props.instance as any).relationshipInstances) {
            const relationshipInstances = (this.props.instance as IWsgRelationshipInstance<any, any>)
                .relationshipInstances;
            const index = relationshipInstances.findIndex(item => (item as any).className === 'BaseBase');
            if (index >= 0) {
                linkedForm = relationshipInstances[index] as any;
            }
        }
        return linkedForm;
    }

    openMapOnClickHandler = () => {
        if (this.state.view === FormView.Map) {
            return this.defaultViewClickHandler();
        }
        this.props.onShowSideViewClick(FormView.Map);
        this.setState({
            view: FormView.Map,
        });
        setTimeout(() => {
            callResizeEvent();
        }, 1500);
    };

    openModelOnClickHandler = () => {
        if (this.state.view === FormView.Model) {
            return this.defaultViewClickHandler();
        }
        this.props.onShowSideViewClick(FormView.Model);
        this.setState({
            view: FormView.Model,
        });
        this.props.setModelViewLoading(true);
    };

    defaultViewClickHandler = () => {
        this.props.onShowSideViewClick(FormView.Default);
        this.setState({
            view: FormView.Default,
        });
    };

    clearMapPositionHandler = () => {
        this.props.onMapPositionChange(null);
        this.defaultViewClickHandler();
    };

    clearModelViewPositionHandler = () => {
        this.props.onModelPositionChange(null);
        this.props.onModelAttachmentDelete();
        this.defaultViewClickHandler();
    };

    private openDocServiceModal = () => {
        this.setState({ folderPickerIsOpen: true });
        openFilePicker({
            url: `${this.props.projectWiseDocumentServiceURL}/picker`,
            imsAuthorizationHeader: `Authorization:${this.props.formsWsgUser.token_type} ${this.props.formsWsgUser.access_token}`,
            project: this.props.activeProjectId,
            advanced: {
                permissions: {
                    deletion: false,
                    renaming: false,
                    moving: false,
                    uploading: false,
                    downloading: false,
                    folderCreation: true,
                },
                directoryId: this.state.selectedFolderId,
                allowedTypes: ['PROJECTSHARE'],
                multiselect: false,
                selectionType: 'FILE',
            },
            success: this.onDocServiceModalSuccess,
            cancel: () => {
                this.setState({ folderPickerIsOpen: false });
            },
            error: (e: any) => {
                console.log(e);
                this.setState({ folderPickerIsOpen: false });
            },
        } as FilePicker.Options);
    };

    private onDocServiceModalSuccess = (data: { id: string }[]) => {
        this.setState({ folderPickerIsOpen: false });
        if (!data || data.length === 0 || !data[0].id) {
            return;
        }
        const link = data[0] as ProjectShareLink;
        this.props.onProjectShareLinkCreated(link);
        this.setState({
            selectedFolderId: null,
        });
    };

    private handleRequestThumbnailUrl = async (instance: IWsgInstance<IAttachmentForSave>): Promise<string> => {
        const blob = instance.properties.File
            ? new Blob([instance.properties.File])
            : await this.props.client.downloadAttachment(
                  instance.instanceId,
                  this.props.activeProjectId,
                  this.props.formsWsgUser,
              );
        return imageBlobThumbnail(blob, 70, 55, 1.5);
    };

    private getCenteredSymbolPinView(longitude: number, latitude: number): InitialCameraView {
        return longitude && latitude ? { center: [longitude, latitude], zoom: 14 } : undefined;
    }

    private getLinksFromInstance(): IWsgInstanceList<ProjectShareFile> {
        let links: IWsgInstanceList<ProjectShareFile> = null;
        if (this.props.instance && (this.props.instance as any).relationshipInstances) {
            links = {
                instances: this.props.linksInInstance
                    .filter(item => !this.props.linksIdToDelete.find(id => id === item.instanceId))
                    // add newly attached files
                    .concat(this.props.newLinks),
            };
        } else {
            links = {
                instances: this.props.newLinks as IWsgInstance<ProjectShareFile>[],
            };
        }
        return links;
    }

    public render() {
        const { t } = this.props;
        const attachments: IWsgInstanceList<IAttachmentForSave> = this.getAttachmentsFromInstance();
        const linksToFiles: IWsgInstanceList<ProjectShareFile> = this.getLinksFromInstance();
        const linkedForm = this.getLinkedForm();
        const isLoaded: boolean = this.isLoadedForm(this.props);

        const latitude: number = this.props.instance ? (this.props.instance.properties.Latitude as number) : null;
        const longitude: number = this.props.instance ? (this.props.instance.properties.Latitude as number) : null;
        const modelPositionCoordinates: Position3D = this.props.instance
            ? ((this.props.instance.properties._ModelPinLocation as unknown) as Position3D)
            : null;
        const modelDescription: string = this.props.instance
            ? (this.props.instance.properties._ModelPinLocationDescription as string)
            : null;
        const mapDescription: string = this.props.instance
            ? (this.props.instance.properties._MapPinLocationDescription as string)
            : null;

        const isMapCoordinatesSet = !!(latitude && longitude);

        const modelImage = this.props.modelImage
            ? this.props.modelImage
            : this.props.modelThumbnailImageDataAjaxState.data
            ? URL.createObjectURL(this.props.modelThumbnailImageDataAjaxState.data)
            : null;

        const isModelImageLoading = this.state.modelImage
            ? false
            : this.props.modelThumbnailImageDataAjaxState.isLoading
            ? true
            : false;

        const mapImage = this.props.mapThumbnailImageDataAjaxState.data
            ? URL.createObjectURL(this.props.mapThumbnailImageDataAjaxState.data)
            : null;

        return (
            <>
                {this.props.formNotFound && <div>{t(this.props.commonProps.fdmEditFormFormNotFound)}</div>}
                {this.state.folderPickerIsOpen && <div className={'bnt-modal-overlay'}/>}
                {!isLoaded ? (
                    <div className="bnt-hc-saving-spinner">
                        <Spinner size={'large'} />
                    </div>
                ) : (
                    <div className="bnt-hc-fdm-edit-form bnt-hc-fdm-edit-form-padding">
                        <div
                            className={
                                'bnt-hc-fdm-edit-form-container bnt-hc-fdm-edit-form-layout-' + this.props.layout
                            }
                        >
                            <div ref={this.formContainer} className="bnt-hc-fdm-edit-form-placeholder"/>
                            {attachments && attachments.instances && attachments.instances.length ? (
                                <AttachmentGrid
                                    onRequestThumbnail={this.handleRequestThumbnailUrl}
                                    attachments={attachments}
                                    onRemoveAttachmentClick={(attachmentId: string) =>
                                        this.props.onAttachmentRemove(attachmentId)
                                    }
                                    onDownloadAttachmentClick={(attachmentId: string) =>
                                        this.onDownloadAttachment(attachmentId)
                                    }
                                />
                            ) : null}
                            {this.props.isFormToShareLinkEnabled && (
                                <>
                                    <div className="bnt-hc-fdm-edit-form-container-attachments-container">
                                        <Button
                                            type={'blue'}
                                            className={'bnt-hc-fdm-edit-form-link-button'}
                                            click={this.openDocServiceModal}
                                        >
                                            {t('fdm-edit-form.link-to-project-document')}
                                        </Button>
                                    </div>
                                    {linksToFiles && linksToFiles.instances && linksToFiles.instances.length ? (
                                        <AttachmentGrid
                                            attachmentsIsToShare={true}
                                            onRequestThumbnail={this.handleRequestLinkThumbnailUrl}
                                            attachments={linksToFiles}
                                            onRemoveAttachmentClick={(attachmentId: string) =>
                                                this.props.onProjectShareLinkRemove(attachmentId)
                                            }
                                            onDownloadAttachmentClick={(attachmentId: string) =>
                                                this.onDownloadLink(attachmentId)
                                            }
                                        />
                                    ) : null}
                                </>
                            )}
                            <FdmEditFormFieldsContainer>
                                {linkedForm && (
                                    <div style={{ margin: 8 }}>
                                        <Link
                                            to={`/${this.props.activeProjectId}/form/${
                                                (linkedForm as any).instanceId
                                            }/select`}
                                        >
                                            {t(this.props.commonProps.fdmEditFormFormLinkedFormText)}
                                        </Link>
                                    </div>
                                )}
                                {this.props.isMapViewEnabled && this.requiredPermissions && (
                                    <div style={{ margin: 8 }}>
                                        <VisualControlFormField
                                            title={t('fdm-edit-form.map-location')}
                                            description={mapDescription}
                                            onClick={this.openMapOnClickHandler}
                                            onDescriptionChange={this.props.onMapDescriptionChange}
                                            opened={this.state.view === FormView.Map && this.props.sideViewOpen}
                                            showClearButton={isMapCoordinatesSet}
                                            onClear={this.clearMapPositionHandler}
                                            isImageLoading={this.props.mapThumbnailImageDataAjaxState.isLoading}
                                            image={mapImage}
                                        />
                                        {isMapCoordinatesSet && (
                                            <Coordinates
                                                longitude={longitude}
                                                latitude={latitude}
                                                coordinatesLongitudeLabel={t(
                                                    this.props.commonProps.coordinatesLongitudeLabel,
                                                )}
                                                coordinatesLatitudeLabel={t(
                                                    this.props.commonProps.coordinatesLatitudeLabel,
                                                )}
                                            />
                                        )}
                                    </div>
                                )}
                                {this.props.isModelViewEnabled &&
                                    this.props.iModelContextAjaxState &&
                                    this.props.iModelContextAjaxState.data.context &&
                                    this.props.iModelContextAjaxState.data.context.instances.length > 0 && (
                                        <div style={{ margin: 8 }}>
                                            <VisualControlFormField
                                                title={t('fdm-edit-form.model-location')}
                                                description={modelDescription}
                                                onClick={this.openModelOnClickHandler}
                                                onDescriptionChange={this.props.onModelDescriptionChange}
                                                opened={this.state.view === FormView.Model && this.props.sideViewOpen}
                                                showClearButton={!!modelPositionCoordinates}
                                                onClear={this.clearModelViewPositionHandler}
                                                image={mapImage}
                                                isImageLoading={isModelImageLoading}
                                            />
                                        </div>
                                    )}
                            </FdmEditFormFieldsContainer>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
