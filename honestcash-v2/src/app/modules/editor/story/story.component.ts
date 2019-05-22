import {Component, ElementRef, HostBinding, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Block, convertBlockToHtml} from '../converters/json-to-html';
import {EmbeddableEditorComponent} from '../embed/embed.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import blankBody from '../../../core/store/editor/editor.story.body.initial-value';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @HostBinding('class') class = 'mb-auto mt-auto';
  @ViewChildren('body') body: QueryList<ElementRef>;

  constructor(
    private modalService: NgbModal
  ) {

  }

  /* tslint:disable */
  story = {
    'id': 4027,
    'alias': 'earning-money-on-honest-cashupvoting-paywalls-and-benefits-4027',
    'body': blankBody,
    'bodyHtml': '',
    'boostCount': 0,
    'description': null,
    'imageUrl': null,
    'languageCode': null,
    'postTypeId': 'article',
    'publishedAt': '2019-05-09T07:36:39.000Z',
    'deletedAt': null,
    'readTime': null,
    'responseCount': 2,
    'satoshiCount': 0,
    'status': 'published',
    'title': 'Earning Money On Honest Cash:Upvoting, Paywalls & Benefits',
    'upvoteCount': 5,
    'unlockCount': 0,
    'paidSectionLinebreak': null,
    'paidSectionCost': 0,
    'createdAt': '2019-04-22T10:42:12.000Z',
    'updatedAt': '2019-05-12T08:06:35.000Z',
    'parentPostId': null,
    'userId': 1,
    'userPostHashtags': [
      {
        'id': 58571,
        'hashtag': 'guides',
        'createdAt': '2019-05-09T09:42:13.000Z',
        'updatedAt': '2019-05-09T09:42:13.000Z',
        'userPostId': 4027
      },
      {
        'id': 58572,
        'hashtag': 'honestcash',
        'createdAt': '2019-05-09T09:42:13.000Z',
        'updatedAt': '2019-05-09T09:42:13.000Z',
        'userPostId': 4027
      },
      {
        'id': 58573,
        'hashtag': 'income',
        'createdAt': '2019-05-09T09:42:13.000Z',
        'updatedAt': '2019-05-09T09:42:13.000Z',
        'userPostId': 4027
      },
      {
        'id': 58574,
        'hashtag': 'upvotes',
        'createdAt': '2019-05-09T09:42:13.000Z',
        'updatedAt': '2019-05-09T09:42:13.000Z',
        'userPostId': 4027
      },
      {
        'id': 58575,
        'hashtag': 'paywalls',
        'createdAt': '2019-05-09T09:42:13.000Z',
        'updatedAt': '2019-05-09T09:42:13.000Z',
        'userPostId': 4027
      }
    ],
    'user': {
      'id': 1,
      'accountType': 'PRIVATE',
      'addressBCH': 'bitcoincash:qrk9kquyydvqn60apxuxnh5jk80p0nkmquwvw9ea95',
      'bio': 'Honest Cash is a social network where you can earn (Bitcoin) Cash by creating and upvoting good content.',
      'country': null,
      'firstName': null,
      'followerCount': 351,
      'followingCount': 67,
      'imageUrl': 'https://honestcash.s3.amazonaws.com/honestcash/f9fgedzi41qpmbx5hopvnk6bba6wa33b.jpeg',
      'isAdmin': true,
      'lastName': null,
      'notifCount': 146,
      'postCount': 0,
      'status': '11',
      'userType': 0,
      'username': 'honest_cash',
      'website': null,
      'createdAt': '2018-11-18T23:10:10.000Z',
      'updatedAt': '2019-05-12T08:06:35.000Z',
      'deletedAt': null,
      'vqUserId': 1,
      'alreadyFollowing': false
    },
    'userPostUnlocks': [],
    'isOwner': false,
    'reader': 1969,
    'plain': 'In this guide ‘Earning Money On Honest Cash’, we will explain how you can earn money on Honest Cash and how to reward others for their quality content. \n These are the areas we will cover:  \n\n- Upvoting\n- How to\n- Upvoting early\n- Paywalls  What is upvoting? \n\nUpvoting is our way of allowing you to show your appreciation for other people’s content. Much like ‘Likes’ on social networks, or ‘Upvotes’ on Reddit but with a monetary reward for those who receive them. \n\nBasically: You upvote content using $0.10 from your Honest Cash wallet. The person who created the content receives $0.10 to their Honest Wallet. \n\nHere’s all the techy stuff if you want to understand exactly how it works. How to upvote \n\nThere are two ways to upvote content. From your main timeline or within the content itself. \n\nHere’s what it looks like in your timeline: \n\n \n\nYou will also find the upvote button at the bottom of each piece of content. There, you are able to see how many upvotes someone has received and** who** upvoted them. \n\n Upvoting Early \n\nThere are financial benefits to upvoting early. \n\nIf you are the first person upvoting a story, you are effectively ‘ making a bet’ that this content will receive more than 5 upvotes. \n\nAfter 5 upvotes your original tip is sent back to you. If the content generates more interest you **profit for finding it early. ** \n\nExample calculation: \n\nYou receive the 2nd upvote (60% of the total amount) \n\nYou receive the 3rd upvote (30% of the total amount) \n\nYou receive the 5th upvote (20% of the total amount) \n\nYou receive the 9th upvote (15% of the total amount) \n\nYou receive the 17th upvote (12% of the total amount) \n\nYou receive the 33rd upvote (10% of the total amount) \n\nIt means that after 33rd upvotes, you will receive almost 150% of your original tip and you will be receiving tips as long as the story is being upvoted. \n\nIt pays to use Honest Cash.  \n\nFor a more detailed explanation of the way upvotes work,  read this guide by Adrian our CEO. Using Paywalls \n\nPaywalls are a cool feature we added that allows users to ‘lock’ some of their content. To unlock the content, users have to pay a small fee. That fee is sent directly to the content creator with a small percentage going towards Honest Cash to fund the development of our platform. How to easily add paywalls to your content \n\n1. Write your content as normal--click publish--then you will see a pop-up box like the one below: \n\n2. Tick the box \'I have a paid section in my story\'. \n\n3. Enter the amount you want to charge to unlock your content. \n\n4. Select the paragraph you want your paid section of content to starts using the up and down arrows. The red line indicates where the free section will end and the paid section begins. \n\n5. When you\'re ready, hit publish! \n\n6. Don\'t wait for the BCH to roll in, quality content needs quality marketing. Make sure you share your post on social media, as part of your email marketing, in online groups, comments, forums and with your family and friends. \n\nHere’s the full explanation of what paywalls are and a breakdown of how the fees are distributed. To stay on top of our developments and updates, follow us on Twitter & join our Telegram group.'
  };

  /* tslint:enable */

  ngOnInit() {
  }

  openEditorModal() {
    const modalRef = this.modalService.open(EmbeddableEditorComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });
  }

  convertBlockToHtml(block: any) {
    return convertBlockToHtml(<Block>block);
  }
}
