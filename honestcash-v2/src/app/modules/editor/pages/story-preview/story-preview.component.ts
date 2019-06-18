import {Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Block, convertBlockToHtml} from '../../converters/json-to-html';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../../app.states';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {State as UserState} from '../../../../store/user/user.state';
import Post from '../../../../shared/models/post';
import User from '../../../../shared/models/user';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';
import {WindowToken} from '../../../../core/helpers/window';
import {EditorService} from '../../services/editor.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'editor-story-preview',
  templateUrl: './story-preview.component.html',
  styleUrls: ['./story-preview.component.scss']
})
export class EditorStoryPreviewComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mb-auto mt-auto';
  @ViewChildren('bodyJSON') bodyJSON: QueryList<ElementRef>;
  @ViewChildren('bodyJSONFree') bodyJSONFree: QueryList<ElementRef>;
  @ViewChildren('bodyJSONPaid') bodyJSONPaid: QueryList<ElementRef>;
  public EDITOR_EDITING_MODES = EDITOR_EDITING_MODES;
  public story: Post = new Post();
  public user: User;
  public freeBodyJSON: Block[];
  public paidBodyJSON: Block[];
  private user$: Observable<UserState>;
  private userSub: Subscription;

  constructor(
    @Inject(WindowToken) private window,
    private sanitizer: DomSanitizer,
    private store: Store<AppStates>,
    private editorService: EditorService,
  ) {
    this.user$ = this.store.select(selectUserState);
  }

  ngOnInit() {
    this.userSub = this.user$.subscribe((userState: UserState) => {
      this.user = userState.user;
    });
    this.setStoryProperties();
    /*fromEvent<StorageEvent>(this.window, 'storage').subscribe(() => {
      this.setStoryProperties();
    });*/
  }

  private convertBlockToHtml(block: Block) {
    return convertBlockToHtml(block);
  }

  private setStoryProperties() {
    // this.story = this.editorService.getLocallySavedPost();
    this.story = {
      "id": 3124,
      "alias": "that-evolution-conversation-between-ross-and-phoebe-3124",
      "body": "<figure><img src=\"https://honestcash.s3.amazonaws.com/honestcash/t24od1gbeiyvmo6wr5hofnn9bgxueaz1.jpeg\" ></figure><h3>Listening</h3><p>The most important skill I took from my ethnographic studies &amp; sociolinguistics background into UX is listening. I use this skill during user interviews, survey design, usability testing and everything in-between. Through listening, I’m making sure that my designs are the real world reflection of the users’ mental representation of what a product should be. With that said, there are two specific things I’m listening for: information and meaning. They’re related but by no means are they the same. A relatable example is when someone’s apologizing and they say: “I’m sorry <em>that</em> you feel that way.”</p><h3>Short example: I’m sorry vs. I’m sorry that you feel that way</h3><p>Language is a living structure composed of sound, grammar and logic in order to convey meaning. It provides order so we can communicate effectively. So when I say, “I’m sorry” you hear a clear and direct apology. I’m sure we can all agree that the opposite of, “I’m sorry” is “I’m not sorry” which is also clear and direct. But these two phrases don’t convey new information since it doesn’t provide anything further than the meaning. Sometimes when people try to apologize, instead of saying, “I’m sorry” they say, “I’m sorry <em>that</em> you feel that way” which is a <em>deliberately disorganized</em> way of saying, “I’m not sorry.” However, it delivers new information because the logic behind “I’m sorry that you feel that way” is: <em>I’m only displaying verbal sympathy for your negative emotional state, but I’m not going to directly apologize for my words or actions that may have caused your state</em>. Yes it’s douchey, but also much more informative.</p><h3>Notes</h3><p>Meaning = order; information = disorder\n</p><p>I’m sorry = order; I’m not sorry = order\n</p><p>I’m sorry that you feel that way = disorder\n</p><p>I’m sorry ≠ I’m sorry that you feel that way\n</p><h3>Ross and Phoebe</h3><p>I thought it would be fun to dissect a 2 minute conversation about evolution between Ross and Phoebe to analyze the information a listener can take away. In the conversation, Phoebe doesn’t believe that evolution is the only theory for existence, which bothers Ross enough that he has to convince her of it. This is has almost 3 million views on Youtube, which means that their dynamics is very relatable. I recommend watching the actual clip because their conversation also interacts with the environment that they’re in: <a href=\"https://youtu.be/6rvPP-IgYJk?t=163\">https://youtu.be/6rvPP-IgYJk?t=163</a> (from 2:43 to 4:40)</p><h3>Who they are</h3><p>Ross: Considered the expert in evolution; he’s a Paleontologist and a Professor.</p><p>Phoebe: Non-expert in evolution.</p><h3><strong>Script w/ notes</strong></h3><p><strong>PHOEBE:</strong> Uh-oh. It's Scary Scientist Man.</p><p><em>Information:</em> Uses informal humor to signal awareness of incoming unwanted lecture from Ross.</p><p><strong>ROSS:</strong> Ok, Phoebe, this is it. In this briefcase I carry actual scientific facts. A briefcase of facts, if you will. Some of these fossils are over 200 million years old.</p><p><em>Information:</em> “…this is it” = Not really a greeting, more like a summons. He’s serious and determined to prove once and for all that evolution is real.</p><p><strong>PHOEBE:</strong> Ok, look, before you even start, I'm not denying evolution, ok, I'm just saying that it's one of the possibilities.</p><p><em>Information:</em> “Before you start” = does not want a lecture from him; “I’m not denying evolution, ok…” = hopes to diffuse tension.</p><p><strong>ROSS:</strong> It's the only possibility, Phoebe.</p><p><em>Information:</em> “only” = direct challenge.</p><p><strong>PHOEBE:</strong> Ok, Ross, could you just open your mind like this much, ok? Wasn't there a time when the brightest minds in the world believed that the world was flat? And, up until like what, 50 years ago, you all thought the atom was the smallest thing, until you split it open, and this like, whole mess of crap came out. Now, are you telling me that you are so unbelievably arrogant that you can't admit that there's a teeny tiny possibility that you could be wrong about this?</p><p><em>Information:</em> “Ok, Ross, could you just open your mind like this much, ok?” = frustration; Phoebe incorporates frank, rhetorical questions to form her strong and valid argument.</p><p><strong>ROSS:</strong> There might be, a teeny, tiny, possibility.</p><p><em>Information:</em> Admitting that he’s wrong to impose his beliefs onto someone else. He loses face.</p><p><strong>PHOEBE:</strong> I can't believe you caved.</p><p><em>Information:</em> Throws Ross off-guard; playful.</p><p><strong>ROSS:</strong> What?</p><p><em>Information:</em> none</p><p><strong>PHOEBE:</strong> You just abandoned your whole belief system. I mean, before, I didn't agree with you, but at least I respected you. How, how, how are you going to go into work tomorrow? How, how are you going to face the other science guys? How, how are you going to face yourself? Oh! That was fun. So who's hungry?</p><p><em>Information:</em> Sarcastic; she demonstrates her superiority in the argument and playfully boasts her win.</p><h3><strong>Summary</strong></h3><p>Ross’ goal is to give facts and reasons to prove to Phoebe as to why he’s right about evolution. He wants approval and Phoebe’s conformity to his own beliefs in order to uphold and validate his reputation as a scientist. Although Phoebe’s initial intention wasn’t to challenge him, she reacted when Ross tried to impose his beliefs on her. In her argument, she gave her own set of facts as to why she thinks that there are more possibilities than only evolution, which falters his standpoint. So even though Ross is the expert when it comes to topics of science and Phoebe isn’t, he lost control of the conversation. She doesn’t play the game of “Do you like me”; she plays the same game as Ross of “Do you respect me.”</p>",
      "bodyMD": "![](<https://honestcash.s3.amazonaws.com/honestcash/t24od1gbeiyvmo6wr5hofnn9bgxueaz1.jpeg>)\n\n## Listening\n\nThe most important skill I took from my ethnographic studies & sociolinguistics background into UX is listening. I use this skill during user interviews, survey design, usability testing and everything in-between. Through listening, I’m making sure that my designs are the real world reflection of the users’ mental representation of what a product should be. With that said, there are two specific things I’m listening for: information and meaning. They’re related but by no means are they the same. A relatable example is when someone’s apologizing and they say: “I’m sorry *that* you feel that way.”\n\n### Short example: I’m sorry vs. I’m sorry that you feel that way\n\nLanguage is a living structure composed of sound, grammar and logic in order to convey meaning. It provides order so we can communicate effectively. So when I say, “I’m sorry” you hear a clear and direct apology. I’m sure we can all agree that the opposite of, “I’m sorry” is “I’m not sorry” which is also clear and direct. But these two phrases don’t convey new information since it doesn’t provide anything further than the meaning. Sometimes when people try to apologize, instead of saying, “I’m sorry” they say, “I’m sorry *that* you feel that way” which is a *deliberately disorganized* way of saying, “I’m not sorry.” However, it delivers new information because the logic behind “I’m sorry that you feel that way” is: *I’m only displaying verbal sympathy for your negative emotional state, but I’m not going to directly apologize for my words or actions that may have caused your state*. Yes it’s douchey, but also much more informative.\n\n### Notes\n\n1\\. Meaning = order; information = disorder\n\n2\\. I’m sorry = order; I’m not sorry = order\n\n3\\. I’m sorry that you feel that way = disorder\n\n4\\. I’m sorry ≠ I’m sorry that you feel that way\n\n## Ross and Phoebe\n\nI thought it would be fun to dissect a 2 minute conversation about evolution between Ross and Phoebe to analyze the information a listener can take away. In the conversation, Phoebe doesn’t believe that evolution is the only theory for existence, which bothers Ross enough that he has to convince her of it. This is has almost 3 million views on Youtube, which means that their dynamics is very relatable. I recommend watching the actual clip because their conversation also interacts with the environment that they’re in: [https://youtu.be/6rvPP-IgYJk?t=163](<https://youtu.be/6rvPP-IgYJk?t=163>) (from 2:43 to 4:40)\n\n### Who they are\n\nRoss: Considered the expert in evolution; he’s a Paleontologist and a Professor.\n\nPhoebe: Non-expert in evolution.\n\n## **Script w/ notes**\n\n**PHOEBE:** Uh-oh. It's Scary Scientist Man.\n\n*Information:* Uses informal humor to signal awareness of incoming unwanted lecture from Ross.\n\n**ROSS:** Ok, Phoebe, this is it. In this briefcase I carry actual scientific facts. A briefcase of facts, if you will. Some of these fossils are over 200 million years old.\n\n*Information:* “…this is it” = Not really a greeting, more like a summons. He’s serious and determined to prove once and for all that evolution is real.\n\n**PHOEBE:** Ok, look, before you even start, I'm not denying evolution, ok, I'm just saying that it's one of the possibilities.\n\n*Information:* “Before you start” = does not want a lecture from him; “I’m not denying evolution, ok…” = hopes to diffuse tension.\n\n**ROSS:** It's the only possibility, Phoebe.\n\n*Information:* “only” = direct challenge.\n\n**PHOEBE:** Ok, Ross, could you just open your mind like this much, ok? Wasn't there a time when the brightest minds in the world believed that the world was flat? And, up until like what, 50 years ago, you all thought the atom was the smallest thing, until you split it open, and this like, whole mess of crap came out. Now, are you telling me that you are so unbelievably arrogant that you can't admit that there's a teeny tiny possibility that you could be wrong about this?\n\n*Information:* “Ok, Ross, could you just open your mind like this much, ok?” = frustration; Phoebe incorporates frank, rhetorical questions to form her strong and valid argument.\n\n**ROSS:** There might be, a teeny, tiny, possibility.\n\n*Information:* Admitting that he’s wrong to impose his beliefs onto someone else. He loses face.\n\n**PHOEBE:** I can't believe you caved.\n\n*Information:* Throws Ross off-guard; playful.\n\n**ROSS:** What?\n\n*Information:* none\n\n**PHOEBE:** You just abandoned your whole belief system. I mean, before, I didn't agree with you, but at least I respected you. How, how, how are you going to go into work tomorrow? How, how are you going to face the other science guys? How, how are you going to face yourself? Oh! That was fun. So who's hungry?\n\n*Information:* Sarcastic; she demonstrates her superiority in the argument and playfully boasts her win.\n\n## **Summary**\n\nRoss’ goal is to give facts and reasons to prove to Phoebe as to why he’s right about evolution. He wants approval and Phoebe’s conformity to his own beliefs in order to uphold and validate his reputation as a scientist. Although Phoebe’s initial intention wasn’t to challenge him, she reacted when Ross tried to impose his beliefs on her. In her argument, she gave her own set of facts as to why she thinks that there are more possibilities than only evolution, which falters his standpoint. So even though Ross is the expert when it comes to topics of science and Phoebe isn’t, he lost control of the conversation. She doesn’t play the game of “Do you like me”; she plays the same game as Ross of “Do you respect me.”\n\n",
      "bodyJSON": [
        {
          "type": "image",
          "data": {
            "file": {
              "url": "https://honestcash.s3.amazonaws.com/honestcash/t24od1gbeiyvmo6wr5hofnn9bgxueaz1.jpeg"
            }
          }
        },
        {
          "type": "header",
          "data": {
            "level": 3,
            "text": "Listening"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "The most important skill I took from my ethnographic studies &amp; sociolinguistics background into UX is listening. I use this skill during user interviews, survey design, usability testing and everything in-between. Through listening, I’m making sure that my designs are the real world reflection of the users’ mental representation of what a product should be. With that said, there are two specific things I’m listening for: information and meaning. They’re related but by no means are they the same. A relatable example is when someone’s apologizing and they say: “I’m sorry <em>that</em> you feel that way.”"
          }
        },
        {
          "type": "header",
          "data": {
            "level": 3,
            "text": "Short example: I’m sorry vs. I’m sorry that you feel that way"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "Language is a living structure composed of sound, grammar and logic in order to convey meaning. It provides order so we can communicate effectively. So when I say, “I’m sorry” you hear a clear and direct apology. I’m sure we can all agree that the opposite of, “I’m sorry” is “I’m not sorry” which is also clear and direct. But these two phrases don’t convey new information since it doesn’t provide anything further than the meaning. Sometimes when people try to apologize, instead of saying, “I’m sorry” they say, “I’m sorry <em>that</em> you feel that way” which is a <em>deliberately disorganized</em> way of saying, “I’m not sorry.” However, it delivers new information because the logic behind “I’m sorry that you feel that way” is: <em>I’m only displaying verbal sympathy for your negative emotional state, but I’m not going to directly apologize for my words or actions that may have caused your state</em>. Yes it’s douchey, but also much more informative."
          }
        },
        {
          "type": "header",
          "data": {
            "level": 3,
            "text": "Notes"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "Meaning = order; information = disorder\n"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "I’m sorry = order; I’m not sorry = order\n"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "I’m sorry that you feel that way = disorder\n"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "I’m sorry ≠ I’m sorry that you feel that way\n"
          }
        },
        {
          "type": "header",
          "data": {
            "level": 3,
            "text": "Ross and Phoebe"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "I thought it would be fun to dissect a 2 minute conversation about evolution between Ross and Phoebe to analyze the information a listener can take away. In the conversation, Phoebe doesn’t believe that evolution is the only theory for existence, which bothers Ross enough that he has to convince her of it. This is has almost 3 million views on Youtube, which means that their dynamics is very relatable. I recommend watching the actual clip because their conversation also interacts with the environment that they’re in: <a href=\"https://youtu.be/6rvPP-IgYJk?t=163\">https://youtu.be/6rvPP-IgYJk?t=163</a> (from 2:43 to 4:40)"
          }
        },
        {
          "type": "header",
          "data": {
            "level": 3,
            "text": "Who they are"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "Ross: Considered the expert in evolution; he’s a Paleontologist and a Professor."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "Phoebe: Non-expert in evolution."
          }
        },
        {
          "type": "header",
          "data": {
            "level": 3,
            "text": "<strong>Script w/ notes</strong>"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<strong>PHOEBE:</strong> Uh-oh. It's Scary Scientist Man."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<em>Information:</em> Uses informal humor to signal awareness of incoming unwanted lecture from Ross."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<strong>ROSS:</strong> Ok, Phoebe, this is it. In this briefcase I carry actual scientific facts. A briefcase of facts, if you will. Some of these fossils are over 200 million years old."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<em>Information:</em> “…this is it” = Not really a greeting, more like a summons. He’s serious and determined to prove once and for all that evolution is real."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<strong>PHOEBE:</strong> Ok, look, before you even start, I'm not denying evolution, ok, I'm just saying that it's one of the possibilities."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<em>Information:</em> “Before you start” = does not want a lecture from him; “I’m not denying evolution, ok…” = hopes to diffuse tension."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<strong>ROSS:</strong> It's the only possibility, Phoebe."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<em>Information:</em> “only” = direct challenge."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<strong>PHOEBE:</strong> Ok, Ross, could you just open your mind like this much, ok? Wasn't there a time when the brightest minds in the world believed that the world was flat? And, up until like what, 50 years ago, you all thought the atom was the smallest thing, until you split it open, and this like, whole mess of crap came out. Now, are you telling me that you are so unbelievably arrogant that you can't admit that there's a teeny tiny possibility that you could be wrong about this?"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<em>Information:</em> “Ok, Ross, could you just open your mind like this much, ok?” = frustration; Phoebe incorporates frank, rhetorical questions to form her strong and valid argument."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<strong>ROSS:</strong> There might be, a teeny, tiny, possibility."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<em>Information:</em> Admitting that he’s wrong to impose his beliefs onto someone else. He loses face."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<strong>PHOEBE:</strong> I can't believe you caved."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<em>Information:</em> Throws Ross off-guard; playful."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<strong>ROSS:</strong> What?"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<em>Information:</em> none"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<strong>PHOEBE:</strong> You just abandoned your whole belief system. I mean, before, I didn't agree with you, but at least I respected you. How, how, how are you going to go into work tomorrow? How, how are you going to face the other science guys? How, how are you going to face yourself? Oh! That was fun. So who's hungry?"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "<em>Information:</em> Sarcastic; she demonstrates her superiority in the argument and playfully boasts her win."
          }
        },
        {
          "type": "header",
          "data": {
            "level": 3,
            "text": "<strong>Summary</strong>"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "Ross’ goal is to give facts and reasons to prove to Phoebe as to why he’s right about evolution. He wants approval and Phoebe’s conformity to his own beliefs in order to uphold and validate his reputation as a scientist. Although Phoebe’s initial intention wasn’t to challenge him, she reacted when Ross tried to impose his beliefs on her. In her argument, she gave her own set of facts as to why she thinks that there are more possibilities than only evolution, which falters his standpoint. So even though Ross is the expert when it comes to topics of science and Phoebe isn’t, he lost control of the conversation. She doesn’t play the game of “Do you like me”; she plays the same game as Ross of “Do you respect me.”"
          }
        }
      ],
      "boostCount": 0,
      "description": null,
      "imageUrl": null,
      "languageCode": null,
      "postTypeId": "article",
      "publishedAt": "2019-06-02T05:01:37.000Z",
      "deletedAt": null,
      "readTime": null,
      "responseCount": 4,
      "satoshiCount": 0,
      "status": "published",
      "title": "That evolution conversation between Ross and Phoebe",
      "upvoteCount": 6,
      "unlockCount": 0,
      "paidSectionLinebreak": null,
      "paidSectionCost": 0,
      "createdAt": "2019-03-16T08:43:59.000Z",
      "updatedAt": "2019-06-16T10:38:19.000Z",
      "parentPostId": null,
      "userId": 1259,
      "userPostHashtags": [
        {
          "id": 64682,
          "hashtag": "friends",
          "createdAt": "2019-06-03T18:38:45.000Z",
          "updatedAt": "2019-06-03T18:38:45.000Z",
          "userPostId": 3124
        },
        {
          "id": 64683,
          "hashtag": "design",
          "createdAt": "2019-06-03T18:38:45.000Z",
          "updatedAt": "2019-06-03T18:38:45.000Z",
          "userPostId": 3124
        },
        {
          "id": 64684,
          "hashtag": "tech",
          "createdAt": "2019-06-03T18:38:45.000Z",
          "updatedAt": "2019-06-03T18:38:45.000Z",
          "userPostId": 3124
        },
        {
          "id": 64685,
          "hashtag": "linguistics",
          "createdAt": "2019-06-03T18:38:45.000Z",
          "updatedAt": "2019-06-03T18:38:45.000Z",
          "userPostId": 3124
        }
      ],
      "user": {
        "id": 1259,
        "accountType": "PRIVATE",
        "addressBCH": "bitcoincash:qqjruz40yz0mg0l0663szu7v38cx9jfk8q7dnch4p2",
        "bio": "",
        "country": null,
        "firstName": null,
        "followerCount": 40,
        "followingCount": 30,
        "imageUrl": "https://honestcash.s3.amazonaws.com/honestcash/jws42ax64xn7r6rxe65y7291t1q8ge4o.jpeg",
        "isAdmin": false,
        "lastName": null,
        "notifCount": 12,
        "postCount": 0,
        "status": "11",
        "userType": 0,
        "username": "jennylin",
        "website": null,
        "createdAt": "2019-02-24T03:17:17.000Z",
        "updatedAt": "2019-06-17T19:57:12.000Z",
        "deletedAt": null,
        "vqUserId": 1330,
        "alreadyFollowing": true
      },
      "userPostUnlocks": [],
      "isOwner": false,
      "reader": 849,
      "plain": "Listening\n\nThe most important skill I took from my ethnographic studies & sociolinguistics background into UX is listening. I use this skill during user interviews, survey design, usability testing and everything in-between. Through listening, I’m making sure that my designs are the real world reflection of the users’ mental representation of what a product should be. With that said, there are two specific things I’m listening for: information and meaning. They’re related but by no means are they the same. A relatable example is when someone’s apologizing and they say: “I’m sorry that you feel that way.”Short example: I’m sorry vs. I’m sorry that you feel that way\n\nLanguage is a living structure composed of sound, grammar and logic in order to convey meaning. It provides order so we can communicate effectively. So when I say, “I’m sorry” you hear a clear and direct apology. I’m sure we can all agree that the opposite of, “I’m sorry” is “I’m not sorry” which is also clear and direct. But these two phrases don’t convey new information since it doesn’t provide anything further than the meaning. Sometimes when people try to apologize, instead of saying, “I’m sorry” they say, “I’m sorry that you feel that way” which is a deliberately disorganized way of saying, “I’m not sorry.” However, it delivers new information because the logic behind “I’m sorry that you feel that way” is: I’m only displaying verbal sympathy for your negative emotional state, but I’m not going to directly apologize for my words or actions that may have caused your state. Yes it’s douchey, but also much more informative.Notes\n\nMeaning = order; information = disorder \n\nI’m sorry = order; I’m not sorry = order \n\nI’m sorry that you feel that way = disorder \n\nI’m sorry ≠ I’m sorry that you feel that way Ross and Phoebe\n\nI thought it would be fun to dissect a 2 minute conversation about evolution between Ross and Phoebe to analyze the information a listener can take away. In the conversation, Phoebe doesn’t believe that evolution is the only theory for existence, which bothers Ross enough that he has to convince her of it. This is has almost 3 million views on Youtube, which means that their dynamics is very relatable. I recommend watching the actual clip because their conversation also interacts with the environment that they’re in: https://youtu.be/6rvPP-IgYJk?t=163 (from 2:43 to 4:40)Who they are\n\nRoss: Considered the expert in evolution; he’s a Paleontologist and a Professor.\n\nPhoebe: Non-expert in evolution.Script w/ notes\n\nPHOEBE: Uh-oh. It's Scary Scientist Man.\n\nInformation: Uses informal humor to signal awareness of incoming unwanted lecture from Ross.\n\nROSS: Ok, Phoebe, this is it. In this briefcase I carry actual scientific facts. A briefcase of facts, if you will. Some of these fossils are over 200 million years old.\n\nInformation: “…this is it” = Not really a greeting, more like a summons. He’s serious and determined to prove once and for all that evolution is real.\n\nPHOEBE: Ok, look, before you even start, I'm not denying evolution, ok, I'm just saying that it's one of the possibilities.\n\nInformation: “Before you start” = does not want a lecture from him; “I’m not denying evolution, ok…” = hopes to diffuse tension.\n\nROSS: It's the only possibility, Phoebe.\n\nInformation: “only” = direct challenge.\n\nPHOEBE: Ok, Ross, could you just open your mind like this much, ok? Wasn't there a time when the brightest minds in the world believed that the world was flat? And, up until like what, 50 years ago, you all thought the atom was the smallest thing, until you split it open, and this like, whole mess of crap came out. Now, are you telling me that you are so unbelievably arrogant that you can't admit that there's a teeny tiny possibility that you could be wrong about this?\n\nInformation: “Ok, Ross, could you just open your mind like this much, ok?” = frustration; Phoebe incorporates frank, rhetorical questions to form her strong and valid argument.\n\nROSS: There might be, a teeny, tiny, possibility.\n\nInformation: Admitting that he’s wrong to impose his beliefs onto someone else. He loses face.\n\nPHOEBE: I can't believe you caved.\n\nInformation: Throws Ross off-guard; playful.\n\nROSS: What?\n\nInformation: none\n\nPHOEBE: You just abandoned your whole belief system. I mean, before, I didn't agree with you, but at least I respected you. How, how, how are you going to go into work tomorrow? How, how are you going to face the other science guys? How, how are you going to face yourself? Oh! That was fun. So who's hungry?\n\nInformation: Sarcastic; she demonstrates her superiority in the argument and playfully boasts her win.Summary\n\nRoss’ goal is to give facts and reasons to prove to Phoebe as to why he’s right about evolution. He wants approval and Phoebe’s conformity to his own beliefs in order to uphold and validate his reputation as a scientist. Although Phoebe’s initial intention wasn’t to challenge him, she reacted when Ross tried to impose his beliefs on her. In her argument, she gave her own set of facts as to why she thinks that there are more possibilities than only evolution, which falters his standpoint. So even though Ross is the expert when it comes to topics of science and Phoebe isn’t, he lost control of the conversation. She doesn’t play the game of “Do you like me”; she plays the same game as Ross of “Do you respect me.”",
      "bodyMarkdownHTML": "<p><img src=\"https://honestcash.s3.amazonaws.com/honestcash/t24od1gbeiyvmo6wr5hofnn9bgxueaz1.jpeg\" alt=\"\" /></p>\n<h2>Listening</h2>\n<p>The most important skill I took from my ethnographic studies &amp; sociolinguistics background into UX is listening. I use this skill during user interviews, survey design, usability testing and everything in-between. Through listening, I’m making sure that my designs are the real world reflection of the users’ mental representation of what a product should be. With that said, there are two specific things I’m listening for: information and meaning. They’re related but by no means are they the same. A relatable example is when someone’s apologizing and they say: “I’m sorry <em>that</em> you feel that way.”</p>\n<h3>Short example: I’m sorry vs. I’m sorry that you feel that way</h3>\n<p>Language is a living structure composed of sound, grammar and logic in order to convey meaning. It provides order so we can communicate effectively. So when I say, “I’m sorry” you hear a clear and direct apology. I’m sure we can all agree that the opposite of, “I’m sorry” is “I’m not sorry” which is also clear and direct. But these two phrases don’t convey new information since it doesn’t provide anything further than the meaning. Sometimes when people try to apologize, instead of saying, “I’m sorry” they say, “I’m sorry <em>that</em> you feel that way” which is a <em>deliberately disorganized</em> way of saying, “I’m not sorry.” However, it delivers new information because the logic behind “I’m sorry that you feel that way” is: <em>I’m only displaying verbal sympathy for your negative emotional state, but I’m not going to directly apologize for my words or actions that may have caused your state</em>. Yes it’s douchey, but also much more informative.</p>\n<h3>Notes</h3>\n<p>1. Meaning = order; information = disorder</p>\n<p>2. I’m sorry = order; I’m not sorry = order</p>\n<p>3. I’m sorry that you feel that way = disorder</p>\n<p>4. I’m sorry ≠ I’m sorry that you feel that way</p>\n<h2>Ross and Phoebe</h2>\n<p>I thought it would be fun to dissect a 2 minute conversation about evolution between Ross and Phoebe to analyze the information a listener can take away. In the conversation, Phoebe doesn’t believe that evolution is the only theory for existence, which bothers Ross enough that he has to convince her of it. This is has almost 3 million views on Youtube, which means that their dynamics is very relatable. I recommend watching the actual clip because their conversation also interacts with the environment that they’re in: <a href=\"https://youtu.be/6rvPP-IgYJk?t=163\">https://youtu.be/6rvPP-IgYJk?t=163</a> (from 2:43 to 4:40)</p>\n<h3>Who they are</h3>\n<p>Ross: Considered the expert in evolution; he’s a Paleontologist and a Professor.</p>\n<p>Phoebe: Non-expert in evolution.</p>\n<h2><strong>Script w/ notes</strong></h2>\n<p><strong>PHOEBE:</strong> Uh-oh. It's Scary Scientist Man.</p>\n<p><em>Information:</em> Uses informal humor to signal awareness of incoming unwanted lecture from Ross.</p>\n<p><strong>ROSS:</strong> Ok, Phoebe, this is it. In this briefcase I carry actual scientific facts. A briefcase of facts, if you will. Some of these fossils are over 200 million years old.</p>\n<p><em>Information:</em> “…this is it” = Not really a greeting, more like a summons. He’s serious and determined to prove once and for all that evolution is real.</p>\n<p><strong>PHOEBE:</strong> Ok, look, before you even start, I'm not denying evolution, ok, I'm just saying that it's one of the possibilities.</p>\n<p><em>Information:</em> “Before you start” = does not want a lecture from him; “I’m not denying evolution, ok…” = hopes to diffuse tension.</p>\n<p><strong>ROSS:</strong> It's the only possibility, Phoebe.</p>\n<p><em>Information:</em> “only” = direct challenge.</p>\n<p><strong>PHOEBE:</strong> Ok, Ross, could you just open your mind like this much, ok? Wasn't there a time when the brightest minds in the world believed that the world was flat? And, up until like what, 50 years ago, you all thought the atom was the smallest thing, until you split it open, and this like, whole mess of crap came out. Now, are you telling me that you are so unbelievably arrogant that you can't admit that there's a teeny tiny possibility that you could be wrong about this?</p>\n<p><em>Information:</em> “Ok, Ross, could you just open your mind like this much, ok?” = frustration; Phoebe incorporates frank, rhetorical questions to form her strong and valid argument.</p>\n<p><strong>ROSS:</strong> There might be, a teeny, tiny, possibility.</p>\n<p><em>Information:</em> Admitting that he’s wrong to impose his beliefs onto someone else. He loses face.</p>\n<p><strong>PHOEBE:</strong> I can't believe you caved.</p>\n<p><em>Information:</em> Throws Ross off-guard; playful.</p>\n<p><strong>ROSS:</strong> What?</p>\n<p><em>Information:</em> none</p>\n<p><strong>PHOEBE:</strong> You just abandoned your whole belief system. I mean, before, I didn't agree with you, but at least I respected you. How, how, how are you going to go into work tomorrow? How, how are you going to face the other science guys? How, how are you going to face yourself? Oh! That was fun. So who's hungry?</p>\n<p><em>Information:</em> Sarcastic; she demonstrates her superiority in the argument and playfully boasts her win.</p>\n<h2><strong>Summary</strong></h2>\n<p>Ross’ goal is to give facts and reasons to prove to Phoebe as to why he’s right about evolution. He wants approval and Phoebe’s conformity to his own beliefs in order to uphold and validate his reputation as a scientist. Although Phoebe’s initial intention wasn’t to challenge him, she reacted when Ross tried to impose his beliefs on her. In her argument, she gave her own set of facts as to why she thinks that there are more possibilities than only evolution, which falters his standpoint. So even though Ross is the expert when it comes to topics of science and Phoebe isn’t, he lost control of the conversation. She doesn’t play the game of “Do you like me”; she plays the same game as Ross of “Do you respect me.”</p>"
    }
    this.story.user = this.user;
    if (this.story.hasPaidSection) {
      this.freeBodyJSON = this.story.bodyJSON.filter((block: Block, index: number) => index <= this.story.paidSectionLinebreak);
      this.paidBodyJSON = this.story.bodyJSON;
    }
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
