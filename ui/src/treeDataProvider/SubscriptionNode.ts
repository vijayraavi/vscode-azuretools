/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ServiceClientCredentials } from 'ms-rest';
import { AzureEnvironment } from 'ms-rest-azure';
import * as path from 'path';
import { AzureTreeDataProvider, IAzureUserInput, IChildProvider } from '../../index';
import { AzureSession } from '../azure-account.api';
import { AzureParentNode } from './AzureParentNode';

export class SubscriptionNode extends AzureParentNode {
    public static readonly contextValue: string = 'azureextensionui.azureSubscription';

    public readonly subscriptionId: string;
    public readonly subscriptionDisplayName: string;

    private readonly _treeDataProvider: AzureTreeDataProvider;
    private readonly _session: AzureSession;
    private readonly _ui: IAzureUserInput;

    public constructor(treeDataProvider: AzureTreeDataProvider, ui: IAzureUserInput, childProvider: IChildProvider, nodeId: string, session: AzureSession, subscriptionDisplayName: string, subscriptionId: string) {
        super(undefined, {
            id: nodeId,
            label: subscriptionDisplayName,
            contextValue: SubscriptionNode.contextValue,
            iconPath: path.join(__filename, '..', '..', '..', '..', 'resources', 'azureSubscription.svg'),
            childTypeLabel: childProvider.childTypeLabel,
            compareChildren: childProvider.compareChildren,
            createChild: childProvider.createChild ? <typeof childProvider.createChild>childProvider.createChild.bind(childProvider) : undefined,
            hasMoreChildren: <typeof childProvider.hasMoreChildren>childProvider.hasMoreChildren.bind(childProvider),
            loadMoreChildren: <typeof childProvider.loadMoreChildren>childProvider.loadMoreChildren.bind(childProvider)
        });
        this._treeDataProvider = treeDataProvider;
        this._ui = ui;
        this._session = session;

        this.subscriptionId = subscriptionId;
        this.subscriptionDisplayName = subscriptionDisplayName;
    }

    public get tenantId(): string {
        return this._session.tenantId;
    }

    public get userId(): string {
        return this._session.userId;
    }

    public get credentials(): ServiceClientCredentials {
        return this._session.credentials;
    }

    public get environment(): AzureEnvironment {
        return this._session.environment;
    }

    public get treeDataProvider(): AzureTreeDataProvider {
        return this._treeDataProvider;
    }

    public get ui(): IAzureUserInput {
        return this._ui;
    }
}
