import YoutubeSubscribeButton from "./youtube-subscribe-button";
import './get-engaged-section.scss';

export default () => (
  <section className="container" id="get-engaged">
    <hr />
    <h2>Get Engaged</h2>
    <p>
      Want to get involved? Here are some ways you can join in the fun - or email/tweet at us if you have other
      thoughts or ideas!
    </p>
    <h4 id="contribute">Contribute to AISC</h4>
    <div className="row">
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="card border-primary mb-3">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">Lead or facilitate discussions</h5>
            <p className="card-text mb-auto mt-auto">We'd love to have you! Please send us an email or tweet at us with any potential
    topics that you want to cover.</p>
            <div className="mt-auto">
              <a href="https://twitter.com/intent/tweet?text=@tdls_to%20I%20am%20interested%20to%20speak%20about:%20"
                target="_blank">
                <i className="fa fa-twitter fa-2x"></i>
              </a>
              <a href="mailto:events@a-i.science?subject:I%20am%20interested%20to%20speak%20at%20AISC" target="_blank">
                <i className="fa fa-envelope fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="card border-primary mb-3">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">Suggest a Papers</h5>
            <p className="card-text mb-auto mt-auto"> We're all ears. Please send us an email or tweet at us with your favorite paper
              and
    we'll put it on our list.</p>
            <div className="mt-auto">
              <a href="https://twitter.com/intent/tweet?text=@tdls_to%20I%20think%20you%20should%20cover%20X" target="_blank">
                <i className="fa fa-twitter fa-2x"></i>
              </a>
              <a href="mailto:events@a-i.science?subject:Change%20suggestion%20for%20TDLS%20website">
                <i className="fa fa-envelope fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="card border-primary mb-3">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">Improve this site</h5>
            <p className="card-text mb-auto mt-auto">Amazing! We're open source, so feel free to clone
            <a target="_blank"
                href="https://github.com/Aggregate-Intellect/aisc-website">our GitHub repo</a>, make changes,
and
    submit a pull request - or you can email or tweet at us with your suggestions.</p>
            <div className="mt-auto">

              <a href="https://github.com/Aggregate-Intellect/aisc-website/blob/master/README.md" target="_blank">
                <i className="fa fa-github fa-2x"></i>
              </a>
              <a href="https://twitter.com/intent/tweet?text=@tdls_to%20Change%20suggestion%20for%20AISC%20website:%20"
                target="_blank">
                <i className="fa fa-twitter fa-2x"></i>
              </a>
              <a href="mailto:events@a-i.science?subject:I%20think%20you%20should%20cover%20X">
                <i className="fa fa-envelope fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="card border-primary mb-3">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">Own a new stream</h5>
            <p className="card-text mb-auto mt-auto">Awesome! Please check out the details link below to learn more about what it
              takes
    to own a stream, and write to us with your ideas.</p>
            <div className="mt-auto">
              <p>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal_own_stream">
                  Details
                </button>
              </p>
              <a href="https://twitter.com/intent/tweet?text=@tdls_to%20I%20want%20to%20own%20a%20stream" target="_blank">
                <i className="fa fa-twitter fa-2x"></i>
              </a>
              <a href="mailto:events@a-i.science?subject:%20I%20want%20to%20own%20a%20stream" target="_blank">
                <i className="fa fa-envelope fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h4>Stay up to date</h4>
    <div className="row">
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="card border-primary mb-3">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">Follow Us on LinkedIn to Receive Updates</h5>

            <div className="mt-auto ml-auto mr-auto">
              <a href="https://www.linkedin.com/company/a-i-science/" target="_blank">
                <img src="/static/images/follow-us-on-linkedin.jpg" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="card border-primary mb-3">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">YouTube</h5>
            <p className="card-text mb-auto mt-auto">To get updates about our videos subscribe to our YouTube channel for a front row seat.</p>
            <div className="mt-auto">
              <YoutubeSubscribeButton />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="card border-primary mb-3">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">Reddit</h5>
            <p className="card-text mb-auto mt-auto">We post our summaries, thoughts, and conclusions on Reddit. Please follow us on
    Reddit, and be sure to share your thoughts with us!</p>
            <div className="mt-auto">
              <a href="https://www.reddit.com/user/tdls_to" target="_blank">
                <i className="fa fa-reddit fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 id="for-organizations">For organizations</h4>

    <div className="row">
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="card border-primary mb-3">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">Companies</h5>
            <p className="card-text mb-auto mt-auto">If you want to host us, please send us an email or tweet at us</p>
            <div className="mt-auto">
              <a href="https://twitter.com/intent/tweet?text=@tdls_to%20We%20want%20to%20host%20AISC" target="_blank">
                <i className="fa fa-twitter fa-2x"></i>
              </a>
              <a href="mailto:events@a-i.science?subject:%20We%20want%20to%20host%20AISC" target="_blank">
                <i className="fa fa-envelope fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="card border-primary mb-3">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">Student Groups at Universities</h5>
            <p className="card-text mb-auto mt-auto">If you want to co-host an event with us, please send us an email or tweet at us</p>
            <div className="mt-auto">
              <a href="https://twitter.com/intent/tweet?text=@tdls_to%20We%20want%20to%20co-host%20an%20event%20with%20AISC"
                target="_blank">
                <i className="fa fa-twitter fa-2x"></i>
              </a>
              <a href="mailto:events@a-i.science?subject:%20We%20want%20to%20co-host%20an%20event%20with%20AISC"
                target="_blank">
                <i className="fa fa-envelope fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="card border-primary mb-3">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">Meetup Organizer</h5>
            <p className="card-text mb-auto mt-auto">We know lots of great folks who can speak about technical topics; check them out on
    our YouTube channel.</p>
            <div className="mt-auto">

              <a href="https://www.youtube.com/channel/UCfk3pS8cCPxOgoleriIufyg?view_as=subscriber&sub_confirmation=1" target="_blank">
                <i className="fa fa-youtube fa-2x"></i>
              </a>
              <a href="https://twitter.com/intent/tweet?text=@tdls_to%20" target="_blank">
                <i className="fa fa-twitter fa-2x"></i>
              </a>
              <a href="mailto:events@a-i.science?subject:collaboration%20with%20meetups" target="_blank">
                <i className="fa fa-envelope fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div >
    </div >
    <div className="modal" tabIndex="-1" role="dialog" id="modal_own_stream">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">What does it take to own a new stream?</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul>
              <li>You define the stream, including: why it should exist; what it includes; who the target
                audience
                is; suggestions for the discussion panel; whether the session format needs to be different from
        typical; event cadence/frequency; etc.</li>
              <li>You coordinate with the steering committee members to make sure that there is a venue sorted
                out
        (although you're not responsible to secure the venue)</li>
              <li>You coordinate with the steering committee members to ensure that the recording is sorted out
        (although you're not responsible for doing the recording)</li>
              <li>You coordinate the discussion panel (leads and facilitators) for your sessions (including the
        paper they will present)</li>
              <li>You're responsible for communications with the panel members (initial arrangement, 2 weeks
                before, and post event; follow up for the panel to send their slides in time for review (if
        necessary), and then for the final version)</li>
              <li>You moderate the sessions in your stream</li>
            </ul>
          </div>
          <div className="modal-footer">
            <a href="https://twitter.com/intent/tweet?text=@tdls_to%20I%20want%20to%20own%20a%20stream" target="_blank">
              <i className="fa fa-twitter fa-2x"></i>
            </a>
            <a href="mailto:events@a-i.science?subject:%20I%20want%20to%20own%20a%20stream" target="_blank">
              <i className="fa fa-envelope fa-2x"></i>
            </a>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </section>
)