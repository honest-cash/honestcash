import SearchResult from "../../core/models/SearchResult";
import SearchService from "../../core/services/SearchService";
import ScopeService from "../../core/services/ScopeService";
import { IGlobalScope } from "../../core/lib/interfaces";
import { IStateParamsService } from "angular-ui-router";

export default class SearchCtrl {
  public static $inject = [
    "$rootScope",
    "$scope",
    "SearchService",
    "ScopeService",
    "$stateParams",
  ];

  private user: any;
  private isLoading: boolean;
  private isTermAvailable: boolean;
  private page: number;
  private term: string;
  private searchResults: SearchResult;
  private searchResultsAvailable: boolean;
  private moreSearchResultsAvailable: boolean = true;

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: ng.IScope,
    private searchService: SearchService,
    private scopeService: ScopeService,
    private $stateParams: IStateParamsService,
  ) {
    this.ngInit();
  }

  private async ngInit() {
    this.user = this.$rootScope.user;

    if (!this.$stateParams.term || !this.$stateParams.term.length) {
      this.isTermAvailable = false;
      this.isLoading = false;
      this.scopeService.safeApply(this.$scope);
      return;
    }
    
    this.term = this.$stateParams.term;

    if (!this.$stateParams.page) {
      this.page = 1;
    } else {
      this.page = parseInt(this.$stateParams.page);
    }

    this.loadSearchResults();
  }

  private async loadSearchResults() {
    
    this.isTermAvailable = true;
    this.isLoading = true;
    this.scopeService.safeApply(this.$scope);

    this.searchResults = await this.searchService.getSearchResults({
      term: this.term,
      page: this.page
    });

    if (this.searchResults.postsCount === 0 && this.searchResults.profilesCount === 0) {
      this.searchResultsAvailable = false;
    } else {
      this.searchResultsAvailable = true;
    }

    this.moreSearchResultsAvailable = this.searchResults.posts.length < 10 ? false : true;

    this.isLoading = false;

    this.scopeService.safeApply(this.$scope);
  }

  private loadMoreSearchResults() {
    if (!this.isLoading && this.moreSearchResultsAvailable) {
      this.page += 1;

      this.loadSearchResults();
    }
  }
}
