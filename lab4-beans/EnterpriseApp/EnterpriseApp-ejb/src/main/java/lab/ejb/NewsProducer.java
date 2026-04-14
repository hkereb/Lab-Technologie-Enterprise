package lab.ejb;

import jakarta.annotation.Resource;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import jakarta.jms.JMSContext;
import jakarta.jms.Queue;

@Stateless
public class NewsProducer {

    @Inject
    private JMSContext jmsContext;

    @Resource(lookup = "java:app/jms/NewsQueue")
    private Queue newsQueue;

    public void sendNewsItem(String heading, String body) {
        NewsItem newsItem = new NewsItem();
        newsItem.setHeading(heading);
        newsItem.setBody(body);
        jmsContext.createProducer().send(newsQueue, newsItem);
    }
}
