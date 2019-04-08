import angular from "angular";
import EditorService from "./EditorService";
import WalletService from "../../core/services/WalletService";
import ScopeService from "../../core/services/ScopeService";

angular.module("vqServices", ["vqConfig"])
.service("editorService", EditorService)
.service("scopeService", ScopeService)
.service("walletService", WalletService);
