import EditorService from './EditorService';
import WalletService from '../../core/services/WalletService';
import ScopeService from '../../core/services/ScopeService';

angular.module("vqServices", [ "vqConfig" ])
.service("EditorService", EditorService)
.service("ScopeService", ScopeService)
.service("WalletService", WalletService);
