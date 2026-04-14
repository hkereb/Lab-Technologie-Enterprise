package lab.ejb;

import jakarta.ejb.Local;

import java.util.List;

@Local
public interface NewsItemFacadeLocal {
    void create(NewsItem newsItem);
    public List<NewsItem> getAllNewsItems();
}
