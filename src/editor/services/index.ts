import EditorService from "./EditorService";
import WalletService from "../../core/services/WalletService";
import ScopeService from "../../core/services/ScopeService";

declare var angular: any;

angular.module("vqServices", ["vqConfig"])
  .service("editorService", EditorService)
  .service("ScopeService", ScopeService)
  .service("WalletService", WalletService);
